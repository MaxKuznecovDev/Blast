import Box from './Box';
import Fire from './Fire';
import {getRandomBoxName,getRandomNumber} from './../libs/functions';

export default class GroupBoxes extends Phaser.GameObjects.Group {
    static generate(scene){
        return new GroupBoxes(scene);
    }
    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.emptyBoxesCoordArr = [];
    }

    createBox(scene, x, y, name,frame,visible,coordOnField){
        let box =  Box.generate(scene, x, y, name,frame,visible,coordOnField);
        this.boxHandler(box);
        this.add(box);
    }
    boxHandler(box){
        box.on('pointerdown',()=>{
            if(this.removeAroundBoxes(box)) {
                let promise = new Promise((resolve) => {
                    this.resolvePromiseBoxHandler = resolve;
                    this.deleteHandler();
                    this.groupBoxCore();
                });
                promise.then(()=>{this.scene.events.emit("minusStep")});
            }
        });
    }
    removeAroundBoxes(targetBox){

        let aroundBoxesArr = this.getAroundBoxesCoord(targetBox);
        let minusStep = false;
        aroundBoxesArr.forEach((adjacentBox)=>{
            let nextBox = this.getMatching('coordOnField',adjacentBox)[0];
            if(nextBox){
                if( targetBox.name === nextBox.name){
                    //I use this technique to avoid error:
                    //Uncaught RangeError: Maximum call stack size exceeded

                    setTimeout(()=>{this.removeAroundBoxes(nextBox);},0);

                    this.addEmptyBoxesCoordInArr(nextBox);
                    Fire.generate(this.scene,nextBox.x,nextBox.y);

                    this.scene.events.emit("addPoint");

                    this.remove(nextBox,true);
                    minusStep = true;
                }
            }
        });
        return minusStep;
    }

    getAroundBoxesCoord(targetBox){
        let initialCoord = this.getCoordInField(targetBox.coordOnField);
        return  [
            `tail_x${(Number(initialCoord.x) - 1)}_y${initialCoord.y}`,
            `tail_x${(Number(initialCoord.x) + 1)}_y${initialCoord.y}`,
            `tail_x${initialCoord.x}_y${Number(initialCoord.y) + 1}`,
            `tail_x${initialCoord.x}_y${Number(initialCoord.y) - 1}`
        ];

    }
    getCoordInField(coordOnField){

        let result = coordOnField.matchAll(/(\w+)_x(\d+)_y(\d+)/g);
        let dataArr = Array.from(result)[0];
        return {
            type: dataArr[1],
            x: dataArr[2],
            y: dataArr[3]
        }

    }
    addEmptyBoxesCoordInArr(nextBox){
        this.emptyBoxesCoordArr.push({
            coordOnField:nextBox.coordOnField,
            x:nextBox.x,
            y:nextBox.y
        });
    }

    addHandler(){
        let boxesArr = this.getChildren();
        boxesArr.forEach((box)=>{
            this.boxHandler(box)
        })
        this.scene.events.emit("addShuffleHandler");
    }
    deleteHandler(){
        let boxesArr = this.getChildren();
        boxesArr.forEach((box)=>{
            box.off('pointerdown');
        });
        this.scene.events.emit("deleteShuffleHandler");
    }

    groupBoxCore(){
        setTimeout(()=> {
            this.rearrangingBoxes();
        },200)
    }
    rearrangingBoxes(){
        this.sortEmptyBoxesCoordArr();
        this.emptyBoxesCoordArr.forEach((emptyBoxCoord, i) => {

            let bottomBox = this.getBottomBox(emptyBoxCoord.coordOnField);

            if (bottomBox) {
                let oldBottomBoxCoord = this.moveBox(bottomBox,emptyBoxCoord);
                this.emptyBoxesCoordArr[i] = oldBottomBoxCoord;

            } else if (this.isFooterBox(emptyBoxCoord.coordOnField)) {
                let baseBox = this.getBaseBox(emptyBoxCoord.coordOnField);
                let oldBaseBoxCoord = this.moveBox(baseBox,emptyBoxCoord,true);
                this.emptyBoxesCoordArr[i] = oldBaseBoxCoord;

                this.createBox(this.scene, oldBaseBoxCoord.x, oldBaseBoxCoord.y, 'boxes', getRandomBoxName(), false, oldBaseBoxCoord.coordOnField);

            }

        });

        setTimeout(()=>{
            this.checkEmptyBoxesCoordArr();
        },200);
    }

    moveBox(box,emptyBoxCoord,visible = false){
        let oldBoxCoord = {
            coordOnField: box.coordOnField,
            x: box.x,
            y: box.y
        };
        box.coordOnField = emptyBoxCoord.coordOnField;
        if(visible){
            box.setVisible(true);
        }
        box.move(emptyBoxCoord.x, emptyBoxCoord.y);
        return oldBoxCoord;

    }

    checkEmptyBoxesCoordArr(){
        let startRearrangingBoxes = false;
        this.emptyBoxesCoordArr.forEach((emptyBoxCoord)=>{

            let typeBox = this.getCoordInField(emptyBoxCoord.coordOnField).type;
            if (typeBox === "tail") startRearrangingBoxes = true;

        });
        if(startRearrangingBoxes) {
            this.rearrangingBoxes()
        }else{

            this.addHandler();
            this.emptyBoxesCoordArr = [];
            this.resolvePromiseBoxHandler();
        };
    }

    sortEmptyBoxesCoordArr(){
        this.emptyBoxesCoordArr = this.emptyBoxesCoordArr.sort( (boxCoord, nextBoxCoord)=> {
            if (boxCoord.y > nextBoxCoord.y) return 1;
            if (boxCoord.y < nextBoxCoord.y) return -1;
            return 0;
        });
    }
    getBottomBox(coordOnField){
            let coordY = this.getCoordInField(coordOnField).y;
            let bottomBoxCoordOnField = coordOnField.replace(`_y${coordY}`, `_y${coordY - 1}`);
            return this.getMatching('coordOnField', bottomBoxCoordOnField)[0];
    }
    getBaseBox(coordOnField){
            let emptyBoxCoordInField = this.getCoordInField(coordOnField);
            let baseBoxCoordOnField = coordOnField.replace(`tail_x${emptyBoxCoordInField.x}_y${emptyBoxCoordInField.y}`, `tailBase_x${emptyBoxCoordInField.x}_y0`);
            return this.getMatching('coordOnField', baseBoxCoordOnField)[0];

    }
    isFooterBox(coordOnField){
            let coordY = this.getCoordInField(coordOnField).y;
            if (coordY == 1) {
                return true;
            }
    }

    shuffleBoxes(){
        let boxesArr = this.getChildren();
        boxesArr.forEach((currentBox,i)=>{
            let nextBox = boxesArr[getRandomNumber(0,41)];
            let typeNextBox = this.getCoordInField(nextBox.coordOnField).type;
            let typeCurrentBox = this.getCoordInField(currentBox.coordOnField).type;

            if( typeCurrentBox === "tail" && typeNextBox === "tail"){
                let currentBoxCoord = {
                    coordOnField: currentBox.coordOnField,
                    x: currentBox.x,
                    y: currentBox.y
                };
                currentBox.coordOnField = nextBox.coordOnField;
                currentBox.setPosition(nextBox.x,nextBox.y);

                nextBox.coordOnField = currentBoxCoord.coordOnField;
                nextBox.setPosition(currentBoxCoord.x ,currentBoxCoord.y);

            }

        });

    }
    checkPossibilityMoveGame(){
        let boxesArr = this.getChildren();
        let impossibilityMoveGame = true;
        boxesArr.forEach((targetBox)=>{
            if(targetBox.coordOnField) {
                let typeTargetBox = this.getCoordInField(targetBox.coordOnField).type;
                if (typeTargetBox == 'tail') {
                    let aroundBoxesArr = this.getAroundBoxesCoord(targetBox);
                    aroundBoxesArr.forEach((adjacentBox) => {
                        let nextBox = this.getMatching('coordOnField', adjacentBox)[0];
                        if (nextBox && targetBox.name === nextBox.name) {
                            impossibilityMoveGame = false;
                        }
                    });
                }
            }
        });
         return impossibilityMoveGame;
    }
}
import GroupBoxesModel from "../models/GroupBoxesModel";


export default class GroupBoxesController {
    constructor(scene, groupBoxesView) {
        this.scene = scene;
        this.groupBoxesView = groupBoxesView;
        this.groupBoxesModel = new GroupBoxesModel(this);
        this.addHandlerOnBox();
        this.shakeGroupBoxes();
        this.addCheckMoveGameHandler();
    }

    addHandlerOnBox(){
        for (let key in this.groupBoxesView.boxesObj) {
            this.groupBoxesModel.boxHandler(this.groupBoxesView.boxesObj[key]);
        }
    }

    deleteBox(box){
        this.groupBoxesView.deleteBox(box);
    }
    createBox(data){
        this.groupBoxesView.createBox(this.scene,data.x,data.y,data.name,data.frame,data.visible,data.coordOnField);
    }
    moveBox(box,emptyBoxCoord,visible = false,resolve){
        let oldBoxCoord = {
            coordOnField: box.coordOnField,
            x: box.x,
            y: box.y
        };
        this.groupBoxesView.boxesObj[emptyBoxCoord.coordOnField] = box;
        box.coordOnField = emptyBoxCoord.coordOnField;
        box.move(emptyBoxCoord.x, emptyBoxCoord.y,visible,resolve);
        return oldBoxCoord;
    }
    getMatchingBox(adjacentBoxCoord){
        return  this.groupBoxesView.boxesObj[adjacentBoxCoord]
    }
    deleteHandler(){
        for (let key in this.groupBoxesView.boxesObj) {
            this.groupBoxesView.boxesObj[key].off('pointerdown');
        }
    }
    addHandlerOnBox(){
        for (let key in this.groupBoxesView.boxesObj) {
            this.groupBoxesModel.boxHandler(this.groupBoxesView.boxesObj[key]);
        }

    }
    shuffleBoxes(){
        let keysArr = Object.keys(this.groupBoxesView.boxesObj);
        for (let key in this.groupBoxesView.boxesObj) {
            let currentBox = this.groupBoxesView.boxesObj[key];
            let keyRandom = keysArr[this.groupBoxesModel.keyRandom(keysArr.length-1)];
            let nextBox = this.groupBoxesView.boxesObj[keyRandom];
            if(this.groupBoxesModel.shuffleBoxesModel(nextBox,currentBox)){
                let currentBoxCoord = {
                    coordOnField: currentBox.coordOnField,
                    x: currentBox.x,
                    y: currentBox.y
                };

                currentBox.coordOnField = nextBox.coordOnField;
                currentBox.changePosition(nextBox.x,nextBox.y);
                this.groupBoxesView.boxesObj[keyRandom] = currentBox;

                nextBox.coordOnField = currentBoxCoord.coordOnField;
                nextBox.changePosition(currentBoxCoord.x ,currentBoxCoord.y);
                this.groupBoxesView.boxesObj[key] = nextBox;
            }
        }
    }
    checkImpossibilityMoveGame(){
        let impossibilityMoveGame = true;
        for (let key in this.groupBoxesView.boxesObj) {
            let targetBox = this.groupBoxesView.boxesObj[key];
            let impossibilityMoveGame = this.groupBoxesModel.checkImpossibilityMoveGameModel(targetBox);

            if(!impossibilityMoveGame){
                return impossibilityMoveGame;
            };

        }
    }
    addCheckMoveGameHandler(){
        this.scene.events.on('checkImpossibilityMoveGame',()=>{
            if(this.checkImpossibilityMoveGame()){
                this.scene.events.emit("startGameOverScene");
            }
        },this);
    }
    addShuffleHandler(){
        this.scene.events.emit("addShuffleHandler");
    }
    deleteShuffleHandler(){
        this.scene.events.emit("deleteShuffleHandler");
    }
    addPoint(){
        this.scene.events.emit("addPoint");
    }
    shake(){
        this.scene.events.emit("shake");
    }
    minusStep(){
        this.scene.events.emit("minusStep");
    }
    shakeGroupBoxes(){
        this.scene.events.on('shakeGroupBoxes',()=>{
            this.shuffleBoxes();
        },this);
    }
}
import {getRandomBoxName, getRandomNumber} from "../libs/functions";

export default class GroupBoxesModel {
    constructor(controller){
        this.controller = controller;
        this.emptyBoxesCoordArr = [];

    }

    boxHandlerLogic(box){
        this.controller.boxHandler(box,()=>{
            let promiseRemoveAroundBoxes = new Promise(promiseRemoveAroundBoxesFunc.bind(this));
            promiseRemoveAroundBoxes.then(resolveRemoveAroundBoxesFunc.bind(this))});

        function promiseRemoveAroundBoxesFunc(resolve) {
            this.resolveRemoveAroundBoxes = resolve;
            this.countCallback = 0;
            this.removeAroundBoxes(box);
        }
        function resolveRemoveAroundBoxesFunc() {

            let promiseRearrangingBoxes = new Promise(promiseRearrangingBoxesFunc.bind(this));
            promiseRearrangingBoxes.then(resolveRearrangingBoxesFunc.bind(this));
        }
        function promiseRearrangingBoxesFunc(resolve) {
            this.resolveEndRearrangingBoxes = resolve;
            this.deleteHandler();
            this.checkAdditionalModules()
            this.rearrangingBoxes();
        }
        function resolveRearrangingBoxesFunc() {
            while (this.controller.checkImpossibilityMoveGame()) {
                this.controller.shake()
            }
            this.targetBox = false;
             this.controller.minusStep();
        }
    }


    removeAroundBoxes(targetBox){
       let boxesCoordArr = this.getBoxesCoord(targetBox);
        boxesCoordArr.forEach((adjacentBoxCoord) => {
            let nextBox = this.controller.getMatchingBox(adjacentBoxCoord);
            if(nextBox && this.superBoxModule){
                this.removeBoxOperations(nextBox,this.controller.getAddPointForSuperBox());
            }else if (nextBox) {
                if (targetBox.name === nextBox.name) {

                    this.removeBoxOperations(nextBox);
                    this.countCallback++;
                    this.removeAroundBoxes(nextBox);
                    this.countCallback--;

                    if(this.countCallback === 0){
                        this.resolveRemoveAroundBoxes();
                    }
                }
            }

        });
        if(this.superBoxModule){
            this.superBoxModule = false;
            this.resolveRemoveAroundBoxes();
        }

    }

    removeBoxOperations(nextBox,addPoint = true){
        this.addEmptyBoxesCoordInArr(nextBox);
        this.controller.createBoxFire(nextBox);
        if(addPoint){
            this.controller.addPoint();
        }
        this.removeBox(nextBox);
    }

    getBoxesCoord(targetBox){
        let boxesCoordArr;
        if(!this.targetBox){
            this.targetBox = targetBox;
            if(this.targetBox.name === "boom_box"){
                boxesCoordArr = this.getLineBoxesCoord(targetBox);
                this.targetBox = false;
                this.superBoxModule = true;
            }
        }
        if(!boxesCoordArr){
            boxesCoordArr = this.getAroundBoxesCoord(targetBox);
        }


        return boxesCoordArr;
    }
    getLineBoxesCoord(targetBox){
        let initialCoord = this.getCoordInField(targetBox.coordOnField);
        let boxesCoordArr = [];
        let fieldWidth = this.controller.getFieldWidth();
        let fieldHeight = this.controller.getFieldHeight();
        let superBoxConfig =  this.controller.getSuperBoxConfig();

        if(superBoxConfig.boomX){
            boxesCoordArr = boxesCoordArr.concat(this.getBoomXarr(initialCoord,fieldWidth));
        }
        if(superBoxConfig.boomY){
            boxesCoordArr = boxesCoordArr.concat(this.getBoomYarr(initialCoord,fieldHeight));
        }

        if(superBoxConfig.boomAll) {
            boxesCoordArr = boxesCoordArr.concat(this.getBoomAllArr(fieldWidth,fieldHeight));
        }
        let radius = superBoxConfig.radius;
        if(radius){
            boxesCoordArr = boxesCoordArr.concat(this.getBoomRadius(initialCoord, radius));
        }

        return boxesCoordArr;
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
    removeBox(box){
        this.controller.deleteBox(box);
    }

    addHandler(){
        this.controller.addHandlerOnBox();
        this.controller.addShuffleHandler();
    }
    deleteHandler(){
        this.controller.deleteHandler();
        this.controller.deleteShuffleHandler();
    }

    rearrangingBoxes(){
        let promiseRearrangingBoxes = new Promise(promiseRearrangingBoxesFunc.bind(this));
        promiseRearrangingBoxes.then(resolveRearrangingBoxesFunc.bind(this));

        function promiseRearrangingBoxesFunc(resolve) {
            this.sortEmptyBoxesCoordArr();

            this.emptyBoxesCoordArr.forEach((emptyBoxCoord, i) => {
                let bottomBox = this.getBottomBox(emptyBoxCoord.coordOnField);
                if (bottomBox) {
                    let oldBottomBoxCoord = this.controller.moveBox(bottomBox, emptyBoxCoord,false,resolve);
                    this.emptyBoxesCoordArr[i] = oldBottomBoxCoord;


                } else if (this.isFooterBox(emptyBoxCoord.coordOnField)) {
                    let baseBox = this.getBaseBox(emptyBoxCoord.coordOnField);
                    let oldBaseBoxCoord = this.controller.moveBox(baseBox, emptyBoxCoord, true,resolve);
                    this.emptyBoxesCoordArr[i] = oldBaseBoxCoord;

                   let boxData = {
                       x: oldBaseBoxCoord.x,
                       y: oldBaseBoxCoord.y,
                       name: 'boxes',
                       frame: getRandomBoxName(),
                       visible: false,
                       coordOnField: oldBaseBoxCoord.coordOnField

                   };

                    this.controller.createBox(boxData);

                }

            });
        }
        function resolveRearrangingBoxesFunc() {
            this.checkEmptyBoxesCoordArr();
        }

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
        return this.controller.getMatchingBox(bottomBoxCoordOnField);
    }
    isFooterBox(coordOnField){
        let coordY = this.getCoordInField(coordOnField).y;
        if (coordY == 1) {
            return true;
        }
    }
    getBaseBox(coordOnField){
        let emptyBoxCoordInField = this.getCoordInField(coordOnField);
        let baseBoxCoordOnField = coordOnField.replace(`tail_x${emptyBoxCoordInField.x}_y${emptyBoxCoordInField.y}`, `tailBase_x${emptyBoxCoordInField.x}_y0`);
        return this.controller.getMatchingBox(baseBoxCoordOnField);

    }


    checkEmptyBoxesCoordArr(){
        let start = false;

        this.emptyBoxesCoordArr.forEach((emptyBoxCoord)=>{

            let typeBox = this.getCoordInField(emptyBoxCoord.coordOnField).type;

            if (typeBox === "tail") {
                start = true;
            }

        });
        this.startOrFinishRearrangingBoxes(start)
    }
    startOrFinishRearrangingBoxes(start){

        if(start) {
            this.rearrangingBoxes()
        }else{
            this.addHandler();
            this.emptyBoxesCoordArr = [];
            this.resolveEndRearrangingBoxes();
        };
    }
    keyRandom(keysArrlength){
        return getRandomNumber(0,keysArrlength);
    }
    shuffleBoxesModel(nextBox,currentBox){
        let typeNextBox = this.getCoordInField(nextBox.coordOnField).type;
        let typeCurrentBox = this.getCoordInField(currentBox.coordOnField).type;
        if( typeCurrentBox === "tail" && typeNextBox === "tail"){
            return true
        }
        return false
    }

    checkImpossibilityMoveGameModel(targetBox){
        let typeTargetBox = this.getCoordInField(targetBox.coordOnField).type;
        if (typeTargetBox == 'tail') {
            let aroundBoxesCoordArr = this.getAroundBoxesCoord(targetBox);
            aroundBoxesCoordArr.forEach((adjacentBoxCoord) => {
                let nextBox = this.controller.getMatchingBox(adjacentBoxCoord);
                if (nextBox && targetBox.name === nextBox.name) {
                    return false
                }
            });
        }

    }
    checkAdditionalModules(){
        let countBoxesForActivation = this.controller.getCountBoxesForActivation();

        if(this.emptyBoxesCoordArr.length >= countBoxesForActivation && this.targetBox ){
            this.superBox();
        }
    }
    superBox(){
        this.emptyBoxesCoordArr.forEach((emptyBoxCoord, i)=>{
            if(emptyBoxCoord.coordOnField === this.targetBox.coordOnField){
                this.emptyBoxesCoordArr.splice(i, 1);
                let boxData = {
                    x: this.targetBox.x,
                    y: this.targetBox.y,
                    name: 'boxes',
                    frame: "boom_box",
                    visible: true,
                    coordOnField: this.targetBox.coordOnField

                };

                this.controller.createBox(boxData);
                this.targetBox = false;

            }
        });

    }
    getBoomXarr(initialCoord,fieldWidth){
        let boxesCoordArr = [];
        for(let i = 0; i < fieldWidth; i++){
            boxesCoordArr.push(`tail_x${i}_y${initialCoord.y}`);
        }
        return boxesCoordArr;
    }
    getBoomYarr(initialCoord,fieldHeight){
        let boxesCoordArr = [];
        for(let i = 0; i < fieldHeight; i++){
            boxesCoordArr.push(`tail_x${initialCoord.x}_y${i}`);
        }
        return boxesCoordArr;
    }
    getBoomAllArr(fieldWidth,fieldHeight){
        let boxesCoordArr = [];
        for (let i = 0; i < fieldWidth; i++) {
            for (let j = 0; j < fieldHeight; j++) {
                boxesCoordArr.push(`tail_x${i}_y${j}`);
            }
        }
        return boxesCoordArr;
    }
    getBoomRadius(initialCoord, radius){
        let boxesCoordArr = [];
        let radiusX = Number(initialCoord.x) + radius;
        let radiusY = Number(initialCoord.y) + radius;
        for (let i = initialCoord.x - radius; i <= radiusX; i++) {
            for (let j = initialCoord.y - radius; j <= radiusY ; j++) {
                boxesCoordArr.push(`tail_x${i}_y${j}`);
            }
        }

        return boxesCoordArr;
    }

}
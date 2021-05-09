import {getRandomBoxName} from './../libs/functions';
import BoxView from "./BoxView";

export default class GroupBoxesView {
    static generate(scene) {
        return new GroupBoxesView(scene);
    }
    constructor(scene) {
        this.scene = scene;
        this.boxesObj = {};
    }
    createBoxInGroup(fieldmap,fieldConfig){
        fieldmap.findObject("tail",(tail)=>{
            let tailCoordX = tail.x + fieldConfig.x;
            let tailCoordY = tail.y + fieldConfig.y;
            let visible = false;
            if(tail.name.indexOf("tailBase") === -1){
                visible = true;
            }
            this.createBox(this.scene,tailCoordX,tailCoordY,'boxes',getRandomBoxName(),visible,tail.name);
        });
    }
    createBox(scene, x, y, name,frame,visible,coordOnField){
        let box =  BoxView.generate(scene, x, y, name,frame,visible,coordOnField);
        this.addBoxInObj(box);
    }
    addBoxInObj(box){
        this.boxesObj[box.coordOnField] = box;
    }
    deleteBox(box){
        box.delete();
        delete this.boxesObj[box.coordOnField];
    }
}
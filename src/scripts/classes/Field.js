import GroupBoxes from './../prefabs/GroupBoxes';
import Box from './../prefabs/Box';
export default class Field {
    constructor(scene){
        this.scene = scene;
        this.fieldCoordX = this.scene.game.config.width/2-150;
        this.fieldCoordY = this.scene.game.config.height/2-168;
        this.init();
        this.create();
    }
    init(){
        this.fieldmap = this.scene.make.tilemap({key:'tilemap'});
        this.fieldset = this.fieldmap.addTilesetImage("fild",'tileset',50,56);
    }
    create(){
        this.createLayer();
        this.createGroupBoxes();
        this.createBoxInGroup();
    }
    createLayer(){
        this.fieldmap.createLayer('tilemap',this.fieldset,this.fieldCoordX,this.fieldCoordY);
    }
    createGroupBoxes(){
        this.groupboxes = new GroupBoxes(this.scene);
    }
    createBoxInGroup(){
        this.fieldmap.findObject("tail",(tail)=>{
            let tailCoordX = tail.x + this.fieldCoordX;
            let tailCoordY = tail.y + this.fieldCoordY;
            let visible = false;
            if(tail.name.indexOf("tailBase") === -1){
                visible = true;
            }
            this.groupboxes.createBox(this.scene,tailCoordX,tailCoordY,'boxes',this.getRandomBoxName(),visible,tail.name);

        });

    }
    getRandomBoxName() {
        let arrBoxName = ['blue', 'green', 'purple', 'red', 'yellow'];
        return arrBoxName[this.getRandomNumber(0,4)] + '_box';
    }
    getRandomNumber(min, max){
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

}
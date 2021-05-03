import GroupBoxes from './../prefabs/GroupBoxes';
import {getRandomBoxName} from './../libs/functions';

export default class Field {
    static generate(scene,fieldConfig){
        return new Field(scene,fieldConfig);
    }
    constructor(scene,fieldConfig){
        this.scene = scene;
        this.fieldConfig = fieldConfig;

        this.init();
        this.create();
    }

    init(){
        this.fieldmap = this.scene.make.tilemap(this.fieldConfig.tilemap);
        this.fieldset = this.fieldmap.addTilesetImage(
            this.fieldConfig.tileset.name,
            this.fieldConfig.tileset.key,
            this.fieldConfig.tileWidth,
            this.fieldConfig.tileHeight
        );
    }
    create(){
        this.createLayer();
        this.createGroupBoxes();
        this.createBoxInGroup();
    }
    createLayer(){
        this.fieldmap.createLayer('tilemap',this.fieldset,this.fieldConfig.x,this.fieldConfig.y);
    }
    createGroupBoxes(){
        this.groupboxes = GroupBoxes.generate(this.scene);
    }
    getGroupBoxes(){
        if(this.groupboxes){
            return this.groupboxes;
        }else {
            return false;
        }

    }
    createBoxInGroup(){
        this.fieldmap.findObject("tail",(tail)=>{
            let tailCoordX = tail.x + this.fieldConfig.x;
            let tailCoordY = tail.y + this.fieldConfig.y;
            let visible = false;
            if(tail.name.indexOf("tailBase") === -1){
                visible = true;
            }
            this.groupboxes.createBox(this.scene,tailCoordX,tailCoordY,'boxes',getRandomBoxName(),visible,tail.name);
        });
    }

}
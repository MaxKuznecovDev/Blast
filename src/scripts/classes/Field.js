import GroupBoxes from './../prefabs/GroupBoxes';
import fieldConfig from "../config/fieldConfig";
import {getRandomBoxName} from './../libs/functions';

export default class Field {
    static generate(scene){
        return new Field({scene});
    }
    constructor(data){
        this.scene = data.scene;

        this.setConfig();
        this.init();
        this.create();
    }

    setConfig(){
        this.tilemapConfig = {key:'tilemap'};
        this.tilesetConfig = {
            tilesetName:"fild",
            key:'tileset',
            tileWidth: fieldConfig.tileWidth,
            tileHeight:fieldConfig.tileHeight
        }
    }

    init(){
        this.fieldmap = this.scene.make.tilemap(this.tilemapConfig);
        this.fieldset = this.fieldmap.addTilesetImage(
            this.tilesetConfig.tilesetName,
            this.tilesetConfig.key,
            this.tilesetConfig.tileWidth,
            this.tilesetConfig.tileHeight
        );
    }
    create(){
        this.createLayer();
        this.createGroupBoxes();
        this.createBoxInGroup();
    }
    createLayer(){
        this.fieldmap.createLayer('tilemap',this.fieldset,fieldConfig.x,fieldConfig.y);
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
            let tailCoordX = tail.x + fieldConfig.x;
            let tailCoordY = tail.y + fieldConfig.y;
            let visible = false;
            if(tail.name.indexOf("tailBase") === -1){
                visible = true;
            }
            this.groupboxes.createBox(this.scene,tailCoordX,tailCoordY,'boxes',getRandomBoxName(),visible,tail.name);
        });
    }

}
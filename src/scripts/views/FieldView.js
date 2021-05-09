
export default class FieldView{
    static generate(scene,fieldConfig){
        return new FieldView(scene,fieldConfig);
    }
    constructor(scene,fieldConfig){
        this.scene = scene;
        this.fieldConfig = fieldConfig;

        this.init();
        this.createLayer();
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
    createLayer(){
        this.fieldmap.createLayer('tilemap',this.fieldset,this.fieldConfig.x,this.fieldConfig.y);
    }
    getFieldmap(){
        return this.fieldmap;
    }
}
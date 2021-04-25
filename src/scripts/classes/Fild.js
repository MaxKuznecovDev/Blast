export default class Fild {
    constructor(scene){
        this.scene = scene;
        this.init();
        this.create();
    }
    init(){
        this.fildmap = this.scene.make.tilemap({key:'tilemap'});
        this.fildset = this.fildmap.addTilesetImage("fild",'tileset',50,56);
    }
    create(){
        this.fildmap.createLayer('tilemap',this.fildset,this.scene.game.config.width/2-150,this.scene.game.config.height/2-168);
    }
}
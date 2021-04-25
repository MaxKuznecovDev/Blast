import Box from './../prefabs/Box';
export default class Fild {
    constructor(scene){
        this.scene = scene;
        this.fildCoordX = this.scene.game.config.width/2-150;
        this.fildCoordY = this.scene.game.config.height/2-168;
        this.init();
        this.create();
    }
    init(){
        this.fildmap = this.scene.make.tilemap({key:'tilemap'});
        this.fildset = this.fildmap.addTilesetImage("fild",'tileset',50,56);
    }
    create(){
        this.createLayer();
        this.createBox();
    }
    createLayer(){
        this.fildmap.createLayer('tilemap',this.fildset,this.fildCoordX,this.fildCoordY);
    }
    createBox(){
        this.fildmap.findObject("tail",(tail)=>{
            let tailCoordX = tail.x + this.fildCoordX;
            let tailCoordY = tail.y + this.fildCoordY;

            const  sprite = new Box (this.scene,tailCoordX,tailCoordY,'boxs',this.getRandomBoxName());

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
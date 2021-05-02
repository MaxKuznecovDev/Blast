import buttonConfig from "../config/buttonConfig";
export default class Button extends Phaser.GameObjects.Sprite{
    static generate(scene){
        return new Button({scene});
    }
    constructor(data) {
        super(data.scene,buttonConfig.x, buttonConfig.y, buttonConfig.name,buttonConfig.frame);
        this.scene = data.scene;
        this.init(buttonConfig.x,buttonConfig.y,buttonConfig.name,buttonConfig.frame);
        this.createText(buttonConfig.x,buttonConfig.y,buttonConfig.textButton);
    }
    init(x,y,name,frame){
        this.setInteractive();
        this.scene.add.sprite(x,y,name,frame);
    }
    createText(x,y,text){
        return this.scene.add.text( x - 25, y - 10, text, {fill: '#ffffff'});
    }

    shuffleHandler(groupBoxes,x,y,count){
        this.shuffleCount = count;
        this.shuffleCountText = this.createText(x,y,count);
        this.on('pointerdown',()=>{
            if(this.shuffleCount > 0) {
                groupBoxes.shuffleBoxes();
                this.shuffleCount--;
                this.shuffleCountText.destroy();
                this.shuffleCountText = this.createText(x,y,this.shuffleCount);
            }
        });
    }
    onHandler(event,callback,cont){
        this.on(event,callback,cont);
    }

}
export default class Button extends Phaser.GameObjects.Sprite{
    static generate(scene,x,y,name,frame,textButton){
        return new Button({scene,x,y,name,frame,textButton});
    }
    constructor(data) {
        super(data.scene,data.x, data.y, data.name,data.frame);
        this.scene = data.scene;
        this.init(data.x,data.y,data.name);
        this.createText(data.x,data.y,data.textButton);
    }
    init(x,y,name){
        this.setInteractive();
        this.scene.add.sprite(x,y,name);
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
}
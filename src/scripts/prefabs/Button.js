export default class Button extends Phaser.GameObjects.Sprite{
    static generate(scene,x,y,name,frame,textButton){
        return new Button({scene,x,y,name,frame,textButton});
    }
    constructor(data) {
        super(data.scene,data.x, data.y, data.name,data.frame);
        this.scene = data.scene;
        this.init(data.x,data.y,data.name);
        this.createTextButton(data.x,data.y,data.textButton);
    }
    init(x,y,name){
        this.setInteractive();
        this.scene.add.sprite(x,y,name);
    }
    createTextButton(x,y,text){
        this.scene.add.text( x - 25, y - 10, text, {fill: '#ffffff'});
    }

    shuffleHandel(groupBoxes){
        this.on('pointerdown',()=>{
            groupBoxes.shuffleBoxes();
        });
    }
}
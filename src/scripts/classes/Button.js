export default class Button extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,name,frame,textButton) {
        super(scene,x, y, name,frame);
        this.scene = scene;
        this.init(x,y,name);
        this.createTextButton(x,y,textButton);
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
export default class Button extends Phaser.GameObjects.Sprite{
    static generate(scene,buttonConfig){
        return new Button(scene,buttonConfig);
    }
    constructor(scene,buttonConfig) {
        super(scene,buttonConfig.x, buttonConfig.y, buttonConfig.name,buttonConfig.frame);
        this.scene = scene;
        this.init(buttonConfig.x,buttonConfig.y,buttonConfig.name,buttonConfig.frame);
        this.createText(buttonConfig.textButton);
    }
    init(x,y,name,frame){
        this.setInteractive();
        this.scene.add.sprite(x,y,name,frame);
    }
    createText(textButton){
        return this.scene.add.text( textButton.x, textButton.y, textButton.text, textButton.style);
    }
    onHandler(event,callback,cont){
        this.on(event,callback,cont);
    }

}
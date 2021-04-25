export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name,frame,visible) {
        super(scene, x, y, name,frame);
        this.scene = scene;
        this.name = frame;
        this.init(visible);
        this.addEventHandler();
    }
    init(visible) {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.setVisible(visible);
    }
    addEventHandler(){
        this.setInteractive();
        this.on('pointerdown',()=>{
            console.log(this);
        });
    }
}
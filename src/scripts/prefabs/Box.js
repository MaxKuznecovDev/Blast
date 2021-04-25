export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name,frame) {
        super(scene, x, y, name,frame);
        this.scene = scene;
        this.name = frame;
        this.init();
    }
    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
    }
}
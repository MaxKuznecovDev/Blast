
export default class Box extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name,frame,visible,coordOnField) {
        super(scene, x, y, name,frame);
        this.scene = scene;
        this.name = frame;
        this.coordOnField = coordOnField;
        this.init(visible);
        this.setInteractive();

    }
    init(visible) {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.setVisible(visible);
    }


}
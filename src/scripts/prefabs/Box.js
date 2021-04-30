
export default class Box extends Phaser.Physics.Arcade.Sprite {
    static generate(scene, x, y, name,frame,visible,coordOnField){
        return new Box({scene, x, y, name,frame,visible,coordOnField});
    }
    constructor(data) {
        super(data.scene, data.x, data.y, data.name,data.frame);
        this.scene = data.scene;
        this.name = data.frame;
        this.coordOnField = data.coordOnField;
        this.init(data.visible);
        this.setInteractive();

    }
    init(visible) {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.setVisible(visible);
    }
    move(x,y){
        this.scene.tweens.add({
            targets:this,
            x:x,
            y:y,
            ease:'Liner',
            duration:120
        });
    }


}
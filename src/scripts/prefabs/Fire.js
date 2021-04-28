export default class Fire extends Phaser.GameObjects.Sprite{
    static generate(scene,x,y){
        return new Fire({scene,x,y});
    }
    constructor(data){
        super(data.scene,data.x, data.y, 'fire','fire1');
        this.scene = data.scene;
        this.scene.add.existing(this);

        const frames = this.scene.anims.generateFrameNames('fire',{
            prefix:'fire',
            start: 1,
            end: 4
        });

        this.scene.anims.create({
            key:'fire',
            frames,
            frameRate:10,
            repeat:0,
        });
        this.once('animationcomplete',()=>{
            this.destroy();
        });
        this.play('fire');

    }
}
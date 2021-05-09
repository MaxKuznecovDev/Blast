
export default class Box extends Phaser.GameObjects.Sprite {
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
    move(x,y,visible,resolve){

        if(visible){
            this.setVisible(true);
        }
        let resolvePromise = ()=> {
            resolve();
        };
        this.scene.tweens.add({
            targets:this,
            x:x,
            y:y,
            ease:'Power0',
            duration:500,
            onComplete:resolvePromise
        });
    }
    changePosition(x,y){
        this.setPosition(x,y);
    }

    delete(){
        this.destroy();
    }

    createFire(){
        let fire  = this.scene.add.sprite(this.x,this.y,'fire','fire1');
        fire.scene.add.existing(fire);
        this.createAnimationFire(fire);
        this.createHandlerFire(fire);

        fire.play('fire');
    }
    createAnimationFire(fire){
        const frames = fire.scene.anims.generateFrameNames('fire',{
            prefix:'fire',
            start: 1,
            end: 4
        });

        fire.scene.anims.create({
            key:'fire',
            frames,
            frameRate:10,
            repeat:0,
        });
    }
    createHandlerFire(fire){
        fire.once('animationcomplete',()=>{
            fire.destroy();
        });
    }



}
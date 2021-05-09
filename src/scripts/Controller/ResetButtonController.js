export default class ResetButtonController {
    constructor(scene, resetButtonView) {
        this.scene = scene;
        this.resetButtonView = resetButtonView;
        this.addHandler();
    }
    addHandler(){

        this.onPointerdownHandler(()=>{
            this.scene.scene.start("GameScene");
        },this);
    }

    onPointerdownHandler(callback,cont){
        this.resetButtonView.on('pointerdown',callback,cont);
    }

}
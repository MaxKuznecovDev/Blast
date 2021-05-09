

export default class ShuffleButtonController {
    constructor(scene, shuffleButtonView) {
        this.scene = scene;
        this.shuffleButtonView = shuffleButtonView;
        this.addHandler();
    }
    addHandler(){

         this.onPointerdownHandler(()=>{
             this.scene.events.emit("shake");
         },this);

         this.scene.events.on('deleteShuffleHandler',this.offPointerdownHandler,this.shuffleButtonView);
        this.scene.events.on('addShuffleHandler', ()=>{
            this.onPointerdownHandler(()=>{
                this.scene.events.emit("shake");
            },this);
        }, this);
    }

    onPointerdownHandler(callback,cont){
        this.shuffleButtonView.on('pointerdown',callback,cont);
    }
    offPointerdownHandler(){
        this.off('pointerdown');
    }
}
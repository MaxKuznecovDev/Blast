export default class LoadBar {
    constructor(scene){
        this.scene = scene;
        this.progressBar = this.scene.add.graphics();
        this.setEvents();
    }

    setEvents(){
        this.scene.load.on('progress',this.showProgressBar,this)
    }
    showProgressBar(value){
        this.progressBar.fillStyle('0x001e3b').fillRect(this.scene.game.config.width/2, this.scene.game.config.height/2,490*value,30);
    }
}
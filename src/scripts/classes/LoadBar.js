export default class LoadBar {
    constructor(scene,loadConfig){
        this.scene = scene;
        this.loadConfig = loadConfig;
        this.progressBar = this.scene.add.graphics();
        this.setEvents();
    }

    setEvents(){
        this.scene.load.on('progress',this.showProgressBar,this)
    }
    showProgressBar(value){
        this.progressBar.fillStyle(this.loadConfig.color).fillRect(this.loadConfig.x, this.loadConfig.y,490*value,30);
    }
}
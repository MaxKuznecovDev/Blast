import Phaser from "phaser";
import Button from "../prefabs/Button";
import winSceneConfig from "../config/winSceneConfig";
import resetButtonConfig from "../config/resetButtonConfig";

export default class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene")

    }
    preload(){
        this.createBackground();
        this.createImg();
        this.createText();
    }
    create(){
        this.createResetButton();
    }
    createBackground(){
        this.add.sprite(0,0,winSceneConfig.backgroundName).setOrigin(0);
    }
    createImg(){
        this.add.sprite(
            winSceneConfig.imgX,
            winSceneConfig.imgY,
            winSceneConfig.imgName
        );
    }
    createText(){
        this.add.text(
            winSceneConfig.textX ,
            winSceneConfig.textY,
            winSceneConfig.text,
            winSceneConfig.textStyle
        );
    }
    createResetButton(){
        this.resetButton = Button.generate(this,resetButtonConfig);

        this.resetButton.onPointerdownHandler(()=>{
            this.scene.start("GameScene");
        });
    }
}
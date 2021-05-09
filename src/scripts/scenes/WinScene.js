import Phaser from "phaser";
import ButtonView from "../views/ButtonView";
import winSceneConfig from "../config/winSceneConfig";
import resetButtonConfig from "../config/resetButtonConfig";
import ResetButtonController from "../Controller/ResetButtonController";

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
        this.resetButton = ButtonView.generate(this,resetButtonConfig);
        new ResetButtonController(this,this.resetButton);

    }
}
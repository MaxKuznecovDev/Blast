import Phaser from "phaser";
import gameOverSceneConfig from "../config/gameOverSceneConfig";
import resetButtonConfig from "../config/resetButtonConfig";
import ButtonView from "../views/ButtonView";
import ResetButtonController from "../Controller/ResetButtonController";



export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene")

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
        this.add.sprite(0,0,gameOverSceneConfig.backgroundName).setOrigin(0);
    }
    createImg(){
        this.add.sprite(
            gameOverSceneConfig.imgX,
            gameOverSceneConfig.imgY,
            gameOverSceneConfig.imgName
        );
    }
    createText(){
        this.add.text(
            gameOverSceneConfig.textX ,
            gameOverSceneConfig.textY,
            gameOverSceneConfig.text,
            gameOverSceneConfig.textStyle
        );
    }
    createResetButton(){
        this.resetButton = ButtonView.generate(this,resetButtonConfig);
        new ResetButtonController(this,this.resetButton);

    }
}
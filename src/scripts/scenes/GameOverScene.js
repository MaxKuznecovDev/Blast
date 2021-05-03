import Phaser from "phaser";
import Button from "../prefabs/Button";
import gameOverSceneConfig from "../config/gameOverSceneConfig";
import resetButtonConfig from "../config/resetButtonConfig";



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
        this.resetButton = Button.generate(this,resetButtonConfig);
        this.resetButton.onHandler('pointerdown',()=>{
            this.scene.start("GameScene");
        });
    }
}
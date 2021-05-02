import Phaser from 'phaser';
import buttonConfig from "../config/buttonConfig";
import scoreConfig from "../config/scoreConfig";
import Field from '../classes/Field';
import Button from '../prefabs/Button';
import Score from "../prefabs/Score";


export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")

    }
    preload(){
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.createBackground("bg");
    }
    create(){
        this.createField();
        this.createShuffleButton();
        this.createPanelScore();
    }

    createBackground(nameBgTexture){
        this.add.sprite(0,0,nameBgTexture).setOrigin(0);
    }
    createField(){
        this.field = Field.generate(this);
    }
    createShuffleButton(){
        this.shuffleButton = Button.generate(
            this,
            buttonConfig.shuffleButton.x,
            buttonConfig.shuffleButton.y,
            buttonConfig.shuffleButton.name,
            buttonConfig.shuffleButton.frame,
            buttonConfig.shuffleButton.textButton);
    }
    createPanelScore(){
        this.panelScore = Score.generate(
            this,
            scoreConfig.x,
            scoreConfig.y,
            scoreConfig.name,
            scoreConfig.frame,
            scoreConfig.stepCount,
            scoreConfig.targetScore,
            scoreConfig.playerScore,
            scoreConfig.shuffleCount,
            this.field.getGroupBoxes());

        this.shuffleButton.on('pointerdown',this.panelScore.shuffleHandler,this.panelScore);
    }
}
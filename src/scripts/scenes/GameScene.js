import Phaser from 'phaser';
import Field from '../classes/Field';
import Button from '../prefabs/Button';
import Score from "../prefabs/Score";


export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")

    }
    preload(){
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
        this.shuffleButton = Button.generate(this);
    }
    createPanelScore(){
        this.panelScore = Score.generate(this, this.field.getGroupBoxes());
        this.shuffleButton.on('pointerdown',this.panelScore.shuffleHandler,this.panelScore);
    }
}
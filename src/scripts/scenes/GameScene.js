import Phaser from 'phaser';
import Field from '../classes/Field';
import Button from '../prefabs/Button';
import scoreConfig from "../config/scoreConfig";
import Score from "../prefabs/Score";
import shuffleButtonConfig from "../config/shuffleButtonConfig";
import fieldConfig from "../config/fieldConfig";

export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")

    }
    preload(){
        this.createBackground("bg");
    }
    create(){
        this.createField();
        this.createPanelScore();
        this.createShuffleButton();

    }

    createBackground(nameBgTexture){
        this.add.sprite(0,0,nameBgTexture).setOrigin(0);
    }
    createField(){
        this.field = Field.generate(this,fieldConfig);
    }
    createPanelScore(){
        this.panelScore = Score.generate(this, this.field.getGroupBoxes(),scoreConfig);

    }
    createShuffleButton(){
        this.shuffleButton = Button.generate(this, shuffleButtonConfig);
        this.shuffleButton.onPointerdownHandler(this.panelScore.shuffleHandler,this.panelScore);
        this.events.on('deleteShuffleHandler',this.shuffleButton.offPointerdownHandler,this.shuffleButton);
        this.events.on('addShuffleHandler', ()=>{
            this.shuffleButton.onPointerdownHandler(this.panelScore.shuffleHandler,this.panelScore);
        }, this.shuffleButton);
    }


}
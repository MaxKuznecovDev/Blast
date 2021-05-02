import Phaser from 'phaser';

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
        this.add.sprite(0,0,"bg").setOrigin(0);
    }
    create(){
        this.field = Field.generate(this);
        this.shuffleButton = Button.generate(this,this.width/2+300,this.height-222,"button1",'shuffleButton','Shake');
        this.panelScore = Score.generate(this,this.width/2 + 300,this.height/2 - 50,"panelScore",'panelScore',30,2000, 0,3,this.field.getGroupBoxes());

        this.shuffleButton.on('pointerdown',this.panelScore.shuffleHandler,this.panelScore);



    }

}
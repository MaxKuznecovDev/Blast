import Phaser from 'phaser';
import Field from '../classes/Field';
import Button from '../classes/Button';


export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")
    }
    preload(){
        this.add.sprite(0,0,"bg").setOrigin(0);
    }
    create(){
        this.field = new Field(this);
        this.shuffleButton = new Button(this,this.game.config.width/2,this.game.config.height-100,"button1",'shuffleButton','Shake');
        this.shuffleButton.shuffleHandel(this.field.getGroupBoxes());

    }
}
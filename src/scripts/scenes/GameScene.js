import Phaser from 'phaser';
import Field from '../classes/Field';
import Button from '../prefabs/Button';


export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")
    }
    preload(){
        this.add.sprite(0,0,"bg").setOrigin(0);
    }
    create(){
        this.field = Field.generate(this);
        this.shuffleButton = Button.generate(this,this.game.config.width/2,this.game.config.height-100,"button1",'shuffleButton','Shake');
        this.shuffleButton.shuffleHandel(this.field.getGroupBoxes());
    }
}
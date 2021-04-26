import Phaser from 'phaser';
import Field from '../classes/Field';


export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")
    }
    preload(){
        this.add.sprite(0,0,"bg").setOrigin(0)

    }

    create(){

        this.field = new Field(this);

      //  console.dir(this.field.groupboxes);

    }
}
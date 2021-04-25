import Phaser from 'phaser';
import Fild from './../classes/Fild';


export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")
    }
    preload(){
        this.add.sprite(0,0,"bg").setOrigin(0)

    }

    create(){

        this.fild = new Fild(this);


    }
}
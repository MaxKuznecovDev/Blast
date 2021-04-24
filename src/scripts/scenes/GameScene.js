import Phaser from 'phaser';
export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")
    }
    preload(){
        this.add.sprite(0,0,"bg").setOrigin(0)
        console.log("preload GameScene")
    }

    create(){
        console.log("create GameScene")
    }
}
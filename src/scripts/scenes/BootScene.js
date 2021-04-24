import Phaser from 'phaser';
import backGround from '../../assets/bg.png';
export default class BootScene extends Phaser.Scene{
    constructor(){
        super("Boot")
    }
    preload(){
        this.load.image('bg',backGround);
    }

    create(){
        console.log("Boot Create")
        this.scene.start("PreloadScene")
    }
}
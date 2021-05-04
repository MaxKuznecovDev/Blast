import Phaser from 'phaser';
import backGround from '../../assets/img/bg.png';
export default class BootScene extends Phaser.Scene{
    constructor(){
        super("Boot")
    }
    preload(){
        this.load.image('bg',backGround);
    }

    create(){
        this.scene.start("PreloadScene")
    }
}
import Phaser from 'phaser';
import LoadBar from '../classes/LoadBar';
export default class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene")
    }
    preload(){
        this.add.sprite(0,0,"bg").setOrigin(0)
        let loadBar = new LoadBar(this);
        console.log("preload Preload")
    }

    create(){
        console.log("create Preload")
        this.scene.start("GameScene")
    }
}
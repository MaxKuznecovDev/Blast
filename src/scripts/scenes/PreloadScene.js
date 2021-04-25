import Phaser from 'phaser';
import LoadBar from '../classes/LoadBar';
import fildPng from '../../assets/fild.png';
import fildJson from '../../assets/fild.json';

export default class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene")
    }
    preload(){
        this.add.sprite(0,0,"bg").setOrigin(0);
        let loadBar = new LoadBar(this);
        this.load.spritesheet('tileset',fildPng,{frameWidth:50,frameHeight:56});
        this.load.tilemapTiledJSON('tilemap',fildJson);
    }

    create(){
        console.log("create Preload")
        this.scene.start("GameScene")
    }
}
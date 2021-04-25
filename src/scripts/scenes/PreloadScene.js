import Phaser from 'phaser';
import LoadBar from '../classes/LoadBar';
import fildPng from '../../assets/fild.png';
import fildJson from '../../assets/fild.json';
import boxPng from '../../assets/boxs.png';
import boxJson from '../../assets/boxs.json';

export default class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene")
    }
    preload(){
        this.add.sprite(0,0,"bg").setOrigin(0);
        let loadBar = new LoadBar(this);
        this.load.spritesheet('tileset',fildPng,{frameWidth:50,frameHeight:56});
        this.load.tilemapTiledJSON('tilemap',fildJson);
        this.load.atlas('boxs',boxPng, boxJson);
    }

    create(){
        this.scene.start("GameScene")
    }
}
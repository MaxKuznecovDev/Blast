import Phaser from 'phaser';
import LoadBar from '../classes/LoadBar';
import fildPng from '../../assets/fild.png';
import fildJson from '../../assets/fild.json';
import boxPng from '../../assets/boxes.png';
import boxJson from '../../assets/boxes.json';
import button1 from '../../assets/button1.png';
import panelScore from '../../assets/panel_score.png';
import firePng from '../../assets/fire.png';
import fireJson from '../../assets/fire.json';
import winPng from '../../assets/win.png'
import gameOverPng from '../../assets/game_over.png'

export default class PreloadScene extends Phaser.Scene{
    constructor(){
        super("PreloadScene")
    }
    preload(){
        this.add.sprite(0,0,"bg").setOrigin(0);
        let loadBar = new LoadBar(this);
        this.load.image('button1',button1);
        this.load.image('panelScore',panelScore);
        this.load.image('winPng',winPng);
        this.load.image('gameOverPng',gameOverPng);
        this.load.spritesheet('tileset',fildPng,{frameWidth:50,frameHeight:56});
        this.load.tilemapTiledJSON('tilemap',fildJson);
        this.load.atlas('boxes',boxPng, boxJson);
        this.load.atlas('fire',firePng, fireJson);
    }

    create(){
        this.scene.start("GameScene");

    }
}
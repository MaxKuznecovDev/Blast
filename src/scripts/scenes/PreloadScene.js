import Phaser from 'phaser';
import generalConfig from '../config/generalConfig';
import LoadBar from '../classes/LoadBar'
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
        this.createBackground("bg");
        let loadBar = new LoadBar(this);

        this.setConfig();
        this.loadImage();
        this.loadSpritesheet();
        this.loadTilemap();
        this.loadAtlas();

    }

    create(){
        this.scene.start("GameScene");
    }
    createBackground(nameBgTexture){
        this.add.sprite(0,0,nameBgTexture).setOrigin(0);
    }

    setConfig(){
        this.images = {
            'button1':button1,
            'panelScore':panelScore,
            'winPng':winPng,
            'gameOverPng':gameOverPng
        }
        this.spritesheetArr = [
            {
                key: 'tileset',
                img: fildPng,
                config: {
                    frameWidth:generalConfig.frameWidth,
                    frameHeight:generalConfig.frameHeight
                }
            }
        ];
        this.tilemaps = {
            'tilemap':fildJson
        };
        this.atlasArr = [
            {key: 'boxes',img: boxPng, json: boxJson},
            {key: 'fire',img: firePng, json: fireJson}
        ];
    }

    loadImage(){
        for (let key in this.images) {
            this.load.image(key,this.images[key]);
        }
    }
    loadSpritesheet(){
        this.spritesheetArr.forEach((spritesheet)=>{
            this.load.spritesheet(spritesheet.key,spritesheet.img,spritesheet.config);
        });
    }
    loadTilemap(){
        for (let key in this.tilemaps) {
            this.load.tilemapTiledJSON(key,this.tilemaps[key]);

        }
    }
    loadAtlas(){
        this.atlasArr.forEach((atlas)=>{
            this.load.atlas(atlas.key,atlas.img, atlas.json);
        });
    }
}
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

        let images = {
            'button1':button1,
            'panelScore':panelScore,
            'winPng':winPng,
            'gameOverPng':gameOverPng
        }
        let spritesheetArr = [
            {
                key: 'tileset',
                img: fildPng,
                config: {
                    frameWidth:generalConfig.frameWidth,
                    frameHeight:generalConfig.frameHeight
                }
            }
        ];
        let tilemaps = {
            'tilemap':fildJson
        };
        let atlasArr = [
            {key: 'boxes',img: boxPng, json: boxJson},
            {key: 'fire',img: firePng, json: fireJson}
        ];

        this.loadImage(images);
        this.loadSpritesheet(spritesheetArr);
        this.loadTilemap(tilemaps);
        this.loadAtlas(atlasArr);

    }

    create(){
        this.scene.start("GameScene");
    }
    createBackground(nameBgTexture){
        this.add.sprite(0,0,nameBgTexture).setOrigin(0);
    }

    loadImage(images){
        for (let key in images) {
            this.load.image(key,images[key]);
        }
    }
    loadSpritesheet(spritesheetArr){
        spritesheetArr.forEach((spritesheet)=>{
            this.load.spritesheet(spritesheet.key,spritesheet.img,spritesheet.config);
        });
    }
    loadTilemap(tilemaps){
        for (let key in tilemaps) {
            this.load.tilemapTiledJSON(key,tilemaps[key]);

        }
    }
    loadAtlas(atlasArr){
        atlasArr.forEach((atlas)=>{
            this.load.atlas(atlas.key,atlas.img, atlas.json);
        });
    }
}
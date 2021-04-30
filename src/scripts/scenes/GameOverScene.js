import Phaser from "phaser";
import Button from "../prefabs/Button";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene")

    }
    preload(){
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.add.sprite(0,0,"bg").setOrigin(0);
        this.add.sprite(this.width/2 + 10,this.height/2 - 100,"gameOverPng");
        this.add.text( this.width/2 - 100, this.height/2 + 150, 'GAME OVER!', {fill: '#7945D6',fontSize:'30px'});
    }
    create(){
        this.resetButton = Button.generate(this,this.width-100,this.height-50,"button1",'resetButton','Reset');
         this.resetButton.onHandler('pointerdown',()=>{
            this.scene.start("GameScene");
        });
    }
}
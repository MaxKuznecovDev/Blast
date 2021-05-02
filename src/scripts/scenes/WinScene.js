import Phaser from "phaser";
import buttonConfig from "../config/buttonConfig";
import Button from "../prefabs/Button";

export default class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene")

    }
    preload(){
        this.width = this.game.config.width;
        this.height = this.game.config.height;
        this.add.sprite(0,0,"bg").setOrigin(0);
        this.add.sprite(this.width/2,this.height/2,"winPng");
        this.add.text( 300, this.height - 100, 'Congratulations, you win!', {fill: '#7945D6',fontSize:'30px'});
    }
    create(){
        this.createResetButton();
    }
    createResetButton(){
        this.resetButton = Button.generate(
            this,
            buttonConfig.resetButton.x,
            buttonConfig.resetButton.y,
            buttonConfig.resetButton.name,
            buttonConfig.resetButton.frame,
            buttonConfig.resetButton.textButton);

        this.resetButton.onHandler('pointerdown',()=>{
            this.scene.start("GameScene");
        });
    }
}
import Phaser from 'phaser';
import scoreConfig from "../config/scoreConfig";
import shuffleButtonConfig from "../config/shuffleButtonConfig";
import fieldConfig from "../config/fieldConfig";
import FieldView from "../views/FieldView";
import GroupBoxesView from "../views/GroupBoxesView";
import ScoreView from "../views/ScoreView";
import ButtonView from "../views/ButtonView";
import GroupBoxesController from "../Controller/GroupBoxesController";
import ShuffleButtonController from "../Controller/ShuffleButtonController";
import ScoreController from "../Controller/ScoreController";

export default class GameScene extends Phaser.Scene{
    constructor(){
        super("GameScene")

    }
    preload(){
        this.createBackground("bg");
    }
    create(){
        this.createField();
        this.createGroupBoxes();
        this.createPanelScore();
        this.createShuffleButton();

    }

    createBackground(nameBgTexture){
        this.add.sprite(0,0,nameBgTexture).setOrigin(0);
    }
    createField(){
        this.field = FieldView.generate(this,fieldConfig);

    }
    createGroupBoxes(){
        this.groupBoxesView = GroupBoxesView.generate(this);
        this.groupBoxesView.createBoxInGroup(this.field.getFieldmap(),fieldConfig);
        this.groupBoxesController = new GroupBoxesController(this,this.groupBoxesView);
    }
    createPanelScore(){
        this.panelScore = ScoreView.generate(this, scoreConfig);
        new ScoreController(this,this.panelScore)
    }
    createShuffleButton(){
        this.shuffleButton = ButtonView.generate(this, shuffleButtonConfig);
        new ShuffleButtonController(this,this.shuffleButton,this.groupBoxesController);
    }



}
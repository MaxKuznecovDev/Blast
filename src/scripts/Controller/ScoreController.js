import scoreConfig from "../config/scoreConfig";
import ScoreModel from "../models/ScoreModel";

export default class ScoreController {
    constructor(scene, scoreView) {
        this.scene = scene;
        this.scoreConfig = scoreConfig;
        this.scoreView = scoreView;
        this.scoreModel = new ScoreModel();


        this.addPointHandler();
        this.addMinusStepHandler();
        this.addShakeHandler();
        this.addGameOverSceneHandler();
    }
    addPointHandler(){
        this.scene.events.on('addPoint',()=>{
            this.scoreView.scoreGame.playerScore = this.scoreModel.changePlayerScore( this.scoreView.scoreGame.playerScore,this.scoreConfig.point);
            this.scoreView.playerScore.destroy();
            this.scoreView.playerScore = this.scoreView.createText(
                this.scoreConfig.playerScoreParam.x,
                this.scoreConfig.playerScoreParam.y,
                this.scoreView.scoreGame.playerScore,
                this.scoreConfig.playerScoreParam.styleText
            );

        },this);
    }
    addMinusStepHandler(){
        this.scene.events.on('minusStep',()=>{
            this.scoreView.scoreGame.stepCount = this.scoreModel.changeStepCount(this.scoreView.scoreGame.stepCount);

            this.scoreView.stepCount.destroy();
            this.scoreView.stepCount = this.scoreView.createText(
                this.scoreConfig.stepCountParam.x,
                this.scoreConfig.stepCountParam.y,
                this.scoreView.scoreGame.stepCount,
                this.scoreConfig.stepCountParam.styleText
            );
            this.checkScore();
        },this);
    }
    checkScore(){
        let checkScoreRes = this.scoreModel.checkScore(
            this.scoreView.scoreGame.playerScore,
            this.scoreView.scoreGame.targetScore,
            this.scoreView.scoreGame.stepCount,
            this.scoreView.scoreGame.shuffleCount
        );
        if(checkScoreRes === "win"){
            this.startWinScene();
        }else if(checkScoreRes === "gameOver"){
            this.startGameOverScene();
        }else if(checkScoreRes === "checkImpossibilityMoveGame"){
            this.checkImpossibilityMoveGame();
        }
    }
    addShakeHandler(){
        this.scene.events.on('shake',()=>{
            this.shuffleHandler();
            this.checkScore();
        },this);
    }
    shuffleHandler(){
        if(this.scoreView.scoreGame.shuffleCount > 0) {
            this.shakeGroupBoxes();
            this.scoreView.scoreGame.shuffleCount = this.scoreModel.shuffleCount( this.scoreView.scoreGame.shuffleCount);
            this.scoreView.shuffleCount.destroy();
            this.scoreView.shuffleCount = this.scoreView.createText(
                this.scoreConfig.shuffleCountParam.x,
                this.scoreConfig.shuffleCountParam.y,
                this.scoreView.scoreGame.shuffleCount,
                this.scoreConfig.shuffleCountParam.styleText
            );
        }

    }
    shakeGroupBoxes(){
        this.scene.events.emit("shakeGroupBoxes");
    }
    checkImpossibilityMoveGame(){
        this.scene.events.emit("checkImpossibilityMoveGame");
    }
    startWinScene(){
        this.scoreView.setScore(this.scoreConfig.stepCount,this.scoreConfig.targetScore,0);
        this.scene.scene.start('WinScene');
    }
    startGameOverScene(){
        this.scoreView.setScore(this.scoreConfig.stepCount,this.scoreConfig.targetScore,0);
        this.scene.scene.start('GameOverScene');
    }
    addGameOverSceneHandler(){
        this.scene.events.on('startGameOverScene',()=>{
            this.startGameOverScene();
        },this);
    }
}
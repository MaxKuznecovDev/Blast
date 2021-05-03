import scoreConfig from "../config/scoreConfig";
export default class Score extends Phaser.GameObjects.Sprite {
    static generate(scene, groupBoxes) {
        return new Score({scene, groupBoxes});
    }

    constructor(data) {
        super(data.scene,scoreConfig.x, scoreConfig.y, scoreConfig.name,scoreConfig.frame);
        this.scene = data.scene;
        this.groupBoxes = data.groupBoxes;
        this.scene.add.sprite(scoreConfig.x,scoreConfig.y,scoreConfig.name,scoreConfig.frame);


        this.setConfig(data);
        this.setScore(scoreConfig.stepCount,scoreConfig.targetScore,scoreConfig.playerScore,scoreConfig.shuffleCount);


        this.addPointHandler();
        this.addMinusStepHandler();


    }
    setConfig(){
        this.baseStepCount = scoreConfig.stepCount;
        this.baseTargetScore = scoreConfig.targetScore;
        this.baseX = scoreConfig.x;
        this.baseY = scoreConfig.y;
    }
    setScore(stepCount,targetScore,playerScore,shuffleCount){

        this.scoreGame = {stepCount,targetScore,playerScore,shuffleCount};

        this.stepCount = this.createText(
            scoreConfig.stepCountParam.x,
            scoreConfig.stepCountParam.y,
            stepCount,
            scoreConfig.stepCountParam.styleText
        );

        this.targetScore = this.createText(
            scoreConfig.targetScoreParam.x,
            scoreConfig.targetScoreParam.y,
            targetScore,
            scoreConfig.targetScoreParam.styleText
        );


        this.playerScore = this.createText(
            scoreConfig.playerScoreParam.x ,
            scoreConfig.playerScoreParam.y,
            playerScore,
            scoreConfig.playerScoreParam.styleText
        );

        this.shuffleCount = this.createText(
            scoreConfig.shuffleCountParam.x,
            scoreConfig.shuffleCountParam.y,
            shuffleCount,
            scoreConfig.shuffleCountParam.styleText
        );

        this.createText(
            scoreConfig.shuffleText.x,
            scoreConfig.shuffleText.y,
            scoreConfig.shuffleText.text,
            scoreConfig.shuffleText.styleText
        );
    }
    addPointHandler(){
        this.scene.events.on('addPoint',(point)=>{
            this.changePlayerScore(point);
        },this);
    }
    addMinusStepHandler(){
        this.scene.events.on('minusStep',()=>{
            this.changeStepCount();
            this.checkScore();
        },this);
    }

    createText(x,y,text,style){
        return this.scene.add.text( x , y , text, style);
    }
    changePlayerScore(point){
        this.scoreGame.playerScore += point;
        this.playerScore.destroy();
        this.playerScore = this.createText(
            scoreConfig.playerScoreParam.x,
            scoreConfig.playerScoreParam.y,
            this.scoreGame.playerScore,
            scoreConfig.playerScoreParam.styleText
        );
    }
    changeStepCount(){
        this.scoreGame.stepCount--;
        this.stepCount.destroy();
        this.stepCount = this.createText(
            scoreConfig.stepCountParam.x,
            scoreConfig.stepCountParam.y,
            this.scoreGame.stepCount,
            scoreConfig.stepCountParam.styleText
        );
    }
    checkScore(){
        if (this.scoreGame.playerScore >= this.scoreGame.targetScore){
            this.setScore(this.baseStepCount,this.baseTargetScore,0);
            this.scene.scene.start('WinScene');
        }else if(this.scoreGame.stepCount === 0 && this.scoreGame.playerScore < this.scoreGame.targetScore ){
            this.setScore(this.baseStepCount,this.baseTargetScore,0);
            this.scene.scene.start('GameOverScene');
        }else if(this.scoreGame.shuffleCount === 0 && this.groupBoxes.checkPossibilityMoveGame()){
            this.scene.scene.start('GameOverScene');
        }

    }
    shuffleHandler(){
            if(this.scoreGame.shuffleCount > 0) {
                this.groupBoxes.shuffleBoxes();
                this.scoreGame.shuffleCount--;
                this.shuffleCount.destroy();
                this.shuffleCount = this.createText(
                    scoreConfig.shuffleCountParam.x,
                    scoreConfig.shuffleCountParam.y,
                    this.scoreGame.shuffleCount,
                    scoreConfig.shuffleCountParam.styleText
                );
            }

    }
}
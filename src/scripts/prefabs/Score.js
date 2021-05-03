export default class Score extends Phaser.GameObjects.Sprite {
    static generate(scene, groupBoxes,scoreConfig) {
        return new Score(scene, groupBoxes,scoreConfig);
    }

    constructor(scene, groupBoxes,scoreConfig) {
        super(scene,scoreConfig.x, scoreConfig.y, scoreConfig.name,scoreConfig.frame);
        this.scene = scene;
        this.groupBoxes = groupBoxes;
        this.scoreConfig = scoreConfig;
        this.scene.add.sprite(scoreConfig.x,scoreConfig.y,scoreConfig.name,scoreConfig.frame);


        this.setConfig();
        this.setScore(scoreConfig.stepCount,scoreConfig.targetScore,scoreConfig.playerScore,scoreConfig.shuffleCount);


        this.addPointHandler();
        this.addMinusStepHandler();


    }
    setConfig(){
        this.baseStepCount = this.scoreConfig.stepCount;
        this.baseTargetScore = this.scoreConfig.targetScore;
        this.baseX = this.scoreConfig.x;
        this.baseY = this.scoreConfig.y;
    }
    setScore(stepCount,targetScore,playerScore,shuffleCount){

        this.scoreGame = {stepCount,targetScore,playerScore,shuffleCount};

        this.stepCount = this.createText(
            this.scoreConfig.stepCountParam.x,
            this.scoreConfig.stepCountParam.y,
            stepCount,
            this.scoreConfig.stepCountParam.styleText
        );

        this.targetScore = this.createText(
            this.scoreConfig.targetScoreParam.x,
            this.scoreConfig.targetScoreParam.y,
            targetScore,
            this.scoreConfig.targetScoreParam.styleText
        );


        this.playerScore = this.createText(
            this.scoreConfig.playerScoreParam.x ,
            this.scoreConfig.playerScoreParam.y,
            playerScore,
            this.scoreConfig.playerScoreParam.styleText
        );

        this.shuffleCount = this.createText(
            this.scoreConfig.shuffleCountParam.x,
            this.scoreConfig.shuffleCountParam.y,
            shuffleCount,
            this.scoreConfig.shuffleCountParam.styleText
        );

        this.createText(
            this.scoreConfig.shuffleText.x,
            this.scoreConfig.shuffleText.y,
            this.scoreConfig.shuffleText.text,
            this.scoreConfig.shuffleText.styleText
        );
    }
    addPointHandler(){
        this.scene.events.on('addPoint',()=>{
            this.changePlayerScore(this.scoreConfig.point);
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
            this.scoreConfig.playerScoreParam.x,
            this.scoreConfig.playerScoreParam.y,
            this.scoreGame.playerScore,
            this.scoreConfig.playerScoreParam.styleText
        );
    }
    changeStepCount(){
        this.scoreGame.stepCount--;
        this.stepCount.destroy();
        this.stepCount = this.createText(
            this.scoreConfig.stepCountParam.x,
            this.scoreConfig.stepCountParam.y,
            this.scoreGame.stepCount,
            this.scoreConfig.stepCountParam.styleText
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
                    this.scoreConfig.shuffleCountParam.x,
                    this.scoreConfig.shuffleCountParam.y,
                    this.scoreGame.shuffleCount,
                    this.scoreConfig.shuffleCountParam.styleText
                );
            }

    }
}
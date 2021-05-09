export default class ScoreView extends Phaser.GameObjects.Sprite {
    static generate(scene, groupBoxes, scoreConfig) {
        return new ScoreView(scene, groupBoxes, scoreConfig);
    }

    constructor(scene, scoreConfig) {
        super(scene, scoreConfig.x, scoreConfig.y, scoreConfig.name, scoreConfig.frame);
        this.scene = scene;
        this.scoreConfig = scoreConfig;
        this.scene.add.sprite(scoreConfig.x, scoreConfig.y, scoreConfig.name, scoreConfig.frame);

        this.setScore(scoreConfig.stepCount, scoreConfig.targetScore, scoreConfig.playerScore, scoreConfig.shuffleCount);

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
    createText(x,y,text,style){
        return this.scene.add.text( x , y , text, style);
    }

}
export default class Score extends Phaser.GameObjects.Sprite {
    static generate(scene, x, y, name, frame,stepCount, targetScore, playerScore,shuffleCount,groupBoxes) {
        return new Score({scene, x, y, name, frame,stepCount, targetScore, playerScore,shuffleCount,groupBoxes});
    }

    constructor(data) {
        super(data.scene,data.x, data.y, data.name,data.frame);
        this.scene = data.scene;
        this.scene.add.sprite(data.x,data.y,data.name,data.frame);
        this.groupBoxes = data.groupBoxes;
        this.baseStepCount = data.stepCount;
        this.baseTargetScore = data.targetScore;
        this.baseX = data.x;
        this.baseY = data.y;
        this.setScore(data.stepCount,data.targetScore,data.playerScore,data.shuffleCount);


        this.scene.events.on('addPoint',(point)=>{
            this.changePlayerScore(point);
        },this);
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
        this.playerScore = this.createText(this.baseX - 20  ,this.baseY + 60 ,this.scoreGame.playerScore,{fill: '#ffffff',fontSize:'30px'});
    }
    changeStepCount(){
        this.scoreGame.stepCount--;
        this.stepCount.destroy();
        this.stepCount = this.createText(this.baseX - 30  ,this.baseY - 60 ,this.scoreGame.stepCount,{fill: '#ffffff',fontSize:'50px'});
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
    setScore(stepCount,targetScore,playerScore,shuffleCount){

        this.scoreGame = {stepCount,targetScore,playerScore,shuffleCount};

        this.stepCount = this.createText(this.baseX-30,this.baseY - 60,stepCount,{fill: '#ffffff',fontSize:'50px'});
        this.targetScore = this.createText(this.baseX - 20,this.baseY - 150,targetScore,{fill: '#ffffff'});
        this.playerScore = this.createText(this.baseX - 20  ,this.baseY + 60 ,playerScore,{fill: '#ffffff',fontSize:'30px'});
        this.shuffleCount = this.createText(this.baseX - 20  ,this.baseY + 90 ,shuffleCount,{fill: '#ffffff',fontSize:'30px'});

    }
    shuffleHandler(){
            if(this.scoreGame.shuffleCount > 0) {
                this.groupBoxes.shuffleBoxes();
                this.scoreGame.shuffleCount--;
                this.shuffleCount.destroy();
                this.shuffleCount = this.createText(this.baseX - 20  ,this.baseY + 90 ,this.scoreGame.shuffleCount,{fill: '#ffffff',fontSize:'30px'});
            }

    }
}
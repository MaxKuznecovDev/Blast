export default class Score extends Phaser.GameObjects.Sprite {
    static generate(scene, x, y, name, frame,stepCount, targetScore, playerScore) {
        return new Score({scene, x, y, name, frame,stepCount, targetScore, playerScore});
    }

    constructor(data) {
        super(data.scene,data.x, data.y, data.name,data.frame);
        this.scene = data.scene;
        this.scene.add.sprite(data.x,data.y,data.name);
        this.scoreGame = {
            stepCount: data.stepCount,
            targetScore: data.targetScore,
            playerScore: data.playerScore,
            x:data.x,
            y:data.y
        };

        this.stepCount = this.createText(data.x-30,data.y - 60,data.stepCount,{fill: '#ffffff',fontSize:'50px'});
        this.targetScore = this.createText(data.x - 20,data.y - 150,data.targetScore,{fill: '#ffffff'});
        this.playerScore = this.createText(data.x - 20  ,data.y + 70 ,data.playerScore,{fill: '#ffffff',fontSize:'30px'});

        this.scene.events.on('addPoint',(point)=>{
            this.changePlayerScore(point);
        },this);
        this.scene.events.on('minusStep',()=>{
            this.changeStepCount()
        },this);


    }
    createText(x,y,text,style){
        return this.scene.add.text( x , y , text, style);
    }

    changePlayerScore(point){
        this.scoreGame.playerScore += point;
        this.playerScore.destroy();
        this.playerScore = this.createText(this.scoreGame.x - 20  ,this.scoreGame.y + 70 ,this.scoreGame.playerScore,{fill: '#ffffff',fontSize:'30px'});
    }
    changeStepCount(){
        this.scoreGame.stepCount--;
        this.stepCount.destroy();
        this.stepCount = this.createText(this.scoreGame.x - 30  ,this.scoreGame.y - 60 ,this.scoreGame.stepCount,{fill: '#ffffff',fontSize:'50px'});
    }

}
export default class ScoreModel {
    changePlayerScore(playerScore,point){
        playerScore += point;
        return playerScore;
    }
    changeStepCount(stepCount){
        stepCount--;
        return stepCount;

    }
    shuffleCount(shuffleCount){
        shuffleCount--;
        return shuffleCount;
    }
    checkScore(playerScore, targetScore, stepCount,shuffleCount){
        if (playerScore >= targetScore){
            return "win";
        }else if(stepCount === 0 && playerScore < targetScore ){
            return "gameOver";
        }
        else if(shuffleCount === 0){
            return "checkImpossibilityMoveGame";
        }
        return true;
    }


}
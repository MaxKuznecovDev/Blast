import generalConfig from "./generalConfig";
export default {
    x:generalConfig.baseWidth/2 + 300,
    y:generalConfig.baseHeight/2 - 50,
    name:"panelScore",
    frame:'panelScore',
    stepCount: 30,
    targetScore:2000,
    playerScore:0,
    shuffleCount:3,
    point:20,

    stepCountParam:{
        styleText:{fill: '#ffffff',fontSize:'50px'},
        x:generalConfig.baseWidth/2 + 270,
        y:generalConfig.baseHeight/2 - 110,
    },
    targetScoreParam:{
        styleText:{fill: '#ffffff'},
        x:generalConfig.baseWidth/2 + 280,
        y:generalConfig.baseHeight/2 - 200,
    },
    playerScoreParam:{
        styleText:{fill: '#ffffff',fontSize:'30px'},
        x:generalConfig.baseWidth/2 + 280,
        y:generalConfig.baseHeight/2 + 10,
    },
    shuffleCountParam:{
        styleText:{fill: '#ffffff',fontSize:'30px'},
        x:generalConfig.baseWidth/2 + 340,
        y:generalConfig.baseHeight/2 +40,
    },
    shuffleText:{
        styleText:{fill: '#ffffff',fontSize:'30px'},
        x:generalConfig.baseWidth/2 + 200,
        y:generalConfig.baseHeight/2 +40,
        text: "Shake:"
    }

}
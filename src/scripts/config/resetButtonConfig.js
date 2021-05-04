import generalConfig from "./generalConfig";
export default {
    x:generalConfig.baseWidth-100,
    y:generalConfig.baseHeight-50,
    name: "button1",
    frame:'resetButton',
    textButton:{
        x:generalConfig.baseWidth-125,
        y:generalConfig.baseHeight-60,
        text:'Reset',
        style:{fill: '#ffffff',font: '16px Comic'}
    }
}
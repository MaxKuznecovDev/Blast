export function getRandomBoxName() {
    let arrBoxName = ['blue', 'green', 'purple', 'red', 'yellow'];
    return arrBoxName[getRandomNumber(0,4)] + '_box';
}
function getRandomNumber(min, max){
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

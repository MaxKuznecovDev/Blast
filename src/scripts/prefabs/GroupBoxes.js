import Box from './Box';
export default class GroupBoxes extends Phaser.GameObjects.Group {

    constructor(scene) {
        super(scene);
    }

    createBox(scene, x, y, name,frame,visible,coordOnField){
        let box = new Box(scene, x, y, name,frame,visible,coordOnField);
        box.on('pointerdown',()=>{
             this.findAroundBoxes(box);
        });
        this.add(box);
    }
    findAroundBoxes(targetBox){

        let aroundBoxesArr = this.getAroundBoxesCoord(targetBox);

        aroundBoxesArr.forEach((adjacentBox)=>{
            let nextBox = this.getMatching('coordOnField',adjacentBox)[0];
            if(nextBox){
               if( targetBox.name === nextBox.name){
                   //I use this technique to avoid error:
                   //Uncaught RangeError: Maximum call stack size exceeded
                   let self = this;
                   setTimeout(function (){self.findAroundBoxes(nextBox)},0);

                   this.remove(nextBox,true);
               }
            }
        });
    }
    getAroundBoxesCoord(targetBox){
        let initialCoord = this.getCoordInField(targetBox.coordOnField);
        return  [
            `tail_x${(Number(initialCoord.x) - 1)}_y${initialCoord.y}`,
            `tail_x${(Number(initialCoord.x) + 1)}_y${initialCoord.y}`,
            `tail_x${initialCoord.x}_y${Number(initialCoord.y) + 1}`,
            `tail_x${initialCoord.x}_y${Number(initialCoord.y) - 1}`
        ];

    }
    getCoordInField(coordOnField){
        let result = coordOnField.matchAll(/(\w+)_x(\d+)_y(\d+)/g);
        let dataArr = Array.from(result)[0];
        return {
            type:dataArr[1],
            x:dataArr[2],
            y:dataArr[3]
        }
    }

}
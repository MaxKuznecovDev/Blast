import Box from './Box';
import {getRandomBoxName} from './../libs/functions';
export default class GroupBoxes extends Phaser.GameObjects.Group {

    constructor(scene) {
        super(scene);
        this.scene = scene;
        this.emptyBoxesCoordArr = [];
    }

    createBox(scene, x, y, name,frame,visible,coordOnField){
        let box = new Box(scene, x, y, name,frame,visible,coordOnField);
        box.on('pointerdown',()=>{
             this.findAroundBoxes(box);
             this.groupBoxCore();
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
                   setTimeout(()=>{self.findAroundBoxes(nextBox);},0);

                   this.addEmptyBoxesCoordInArr(nextBox);
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
    addEmptyBoxesCoordInArr(nextBox){
        this.emptyBoxesCoordArr.push({
            coordOnField:nextBox.coordOnField,
            x:nextBox.x,
            y:nextBox.y
        });
    }


    groupBoxCore(){
        let self = this;
        setTimeout(()=> {
          function rearrangingBoxes() {
              self.emptyBoxesCoordArr.forEach((emptyBoxCoord, i) => {

                  let bottomBox = self.getBottomBox(emptyBoxCoord.coordOnField);

                  if (bottomBox) {
                      let oldBottomBoxCoord = {
                          coordOnField: bottomBox.coordOnField,
                          x: bottomBox.x,
                          y: bottomBox.y
                      };
                      bottomBox.coordOnField = emptyBoxCoord.coordOnField;
                      bottomBox.x = emptyBoxCoord.x;
                      bottomBox.y = emptyBoxCoord.y;
                      self.emptyBoxesCoordArr[i] = oldBottomBoxCoord;

                  } else if (self.isFooterBox(emptyBoxCoord.coordOnField)) {
                      let baseBox = self.getBaseBox(emptyBoxCoord.coordOnField);

                      let oldBaseBoxCoord = {
                          coordOnField: baseBox.coordOnField,
                          x: baseBox.x,
                          y: baseBox.y
                      };
                      baseBox.coordOnField = emptyBoxCoord.coordOnField;
                      baseBox.x = emptyBoxCoord.x;
                      baseBox.y = emptyBoxCoord.y;
                      self.emptyBoxesCoordArr[i] = oldBaseBoxCoord;

                      self.createBox(self.scene, oldBaseBoxCoord.x, oldBaseBoxCoord.y, 'boxes', getRandomBoxName(), true, oldBaseBoxCoord.coordOnField);

                  }
              });

              setTimeout(()=>{
                  let startRearrangingBoxes = false;
                  self.emptyBoxesCoordArr.forEach((emptyBoxCoord)=>{
                      let typeBox = self.getCoordInField(emptyBoxCoord.coordOnField).type;
                      if(typeBox == "tail") startRearrangingBoxes = true;

                  });
                  if(startRearrangingBoxes) rearrangingBoxes();
              },500)

          }
            rearrangingBoxes();

        },1000)
    }

    getBottomBox(coordOnField){

        let coordY = this.getCoordInField(coordOnField).y;
        let bottomBoxCoordOnField = coordOnField.replace(`_y${coordY}`, `_y${coordY-1}`);
        return this.getMatching('coordOnField',bottomBoxCoordOnField)[0];

    }
    getBaseBox(coordOnField){

        let emptyBoxCoordInField = this.getCoordInField(coordOnField);
        let baseBoxCoordOnField = coordOnField.replace(`tail_x${emptyBoxCoordInField.x}_y${emptyBoxCoordInField.y}`, `tailBase_x${emptyBoxCoordInField.x}_y0`);
        return this.getMatching('coordOnField',baseBoxCoordOnField)[0];
    }
    isFooterBox(coordOnField){
        let coordY = this.getCoordInField(coordOnField).y;
        if(coordY == 1){
            return true;
        }
        return false;
    }

}
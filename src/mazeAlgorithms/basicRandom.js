function basicRandom(grid, startNode, finishNode) {
     var grid1 = []
     // let cIdY=grid.length[0]-10;
     // for(let c=0 ;c<10;c++)
     // {
     //      let cIdXone= Math.floor(grid.length/2)-c;
     //      let cIdXtwo = Math.floor(grid.length/2)+c;
     //      // let cIdone = cIdY-cIdXone;
     //      // let cIdtwo = cIdY-cIdXtwo;
     //      console.log(cIdXone);
     //      console.log(cIdXtwo);
     //      // console.log((cIdY,cIdtwo));
     //      if(cIdy>=20 || CIdXone>=50 || cIdXtwo>=50){
     //           continue;
     //      }
     //      else{
     //           grid1.push(grid[cIdY][cIdXone]);
     //           grid1.push(grid[cIdY][cIdXtwo]);
     //      }
     //      // console.log(cIdone);
     //      // console.log(cIdtwo);
     // }
     for (var i = 0; i < 20; i += 3) {
          for (var j = 0; j < 50; j += 3) {
               var x = Math.floor((Math.random() * 10) + 1);
               var col = Math.abs(i - x);
               var row = Math.abs(j - x);
               if (col == startNode.col && row == startNode.row) {
                    continue;
               }
               else if (col == finishNode.col && row == finishNode.row) {
                    continue;
               }
               grid1.push(grid[col][row]);
          }
     }
     return grid1;
}


export default basicRandom;
function recure(grid,rowStart, rowEnd, colStart, colEnd,grid1,startNode, finishNode){
  if (rowEnd >= (grid.length)-1 || colEnd >= grid.length[0]-1 || rowStart < 0 || colStart < 0) {
            return;
  }
  var x=colStart;
  var y=colEnd;
  for(var m=colStart;m<colEnd;m+=3)
  {
    let possibleRows = [];
  for (let number = rowStart; number <= rowEnd; number += 1) {
    possibleRows.push(number);
  }
  let possibleCols = []
  for (let number = colStart; number <= colEnd; number += 1) {
    possibleCols.push(number);
  }
  while(possibleCols.length!=1 && possibleRows.length!=1)
  {
    var randomRowIndex1 = Math.ceil(Math.random() * possibleRows.length);
    var randomRowIndex2 = Math.ceil(Math.random() * possibleRows.length);
    var randomColIndex = Math.ceil(Math.random() * possibleCols.length);
    let currentRow1 = possibleRows[randomRowIndex1];
    let currentRow2 = possibleRows[randomRowIndex2];
    let colRandom = possibleCols[randomColIndex];
    if(currentRow1==undefined || colRandom==undefined  || currentRow2==undefined)
    {
      possibleRows.splice(randomRowIndex1,1);
      possibleCols.splice(randomColIndex,1);
      continue
    }
    else{
      for(let k=currentRow1;k<currentRow2;k+=2)
      {
        var ans=0;
        for(let j=0;j<grid1.length;j++)
        {
          if(grid[k][colRandom]==grid1[j])
          {
            ans=1;
          }
        }
        if(ans==0)
        {
          if(grid[k][colRandom]!=startNode && grid[k][colRandom]!=finishNode)
        {
          grid1.push(grid[k][colRandom]);
        }
        }
      }
    }
    possibleRows.splice(randomRowIndex1,1);
    possibleCols.splice(randomColIndex,1);
  }
  }
  return grid1;
}

function chanceMazeV(grid, rowStart, rowEnd, colStart, colEnd, startNode, finishNode){
  let grid1=[];
  for(let i=0;i<20;i++)
  {
    for(let j=0;j<50;j++)
    {
      if(i==0 || i==grid.length-1 || j==0 || j==grid[0].length-1)
      {
        if(grid[i][j]==startNode || grid[i][j]==finishNode)
        {
          continue;
        }
        else{
          grid1.push(grid[i][j]);
        }
      }
    }
  }
  rowStart=1;
  rowEnd =grid.length-2;
  colStart=1;
  colEnd=grid[0].length-2;
  var x =recure(grid,rowStart, rowEnd, colStart, colEnd,grid1,startNode, finishNode);
  return x;
}

export default chanceMazeV;
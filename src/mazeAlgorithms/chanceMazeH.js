function recure(grid,rowStart, rowEnd, colStart, colEnd,grid1,startNode, finishNode){
    if (rowEnd >= (grid.length)-1 || colEnd >= grid.length[0]-1 || rowStart < 0 || colStart < 0) {
              return;
    }
    var x=colStart;
    var y=colEnd;
    for(var m=colStart;m<colEnd;m+=6)
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
      var randomRowIndex = Math.ceil(Math.random() * possibleRows.length);
      var randomColIndex1 = Math.ceil(Math.random() * possibleCols.length);
      var randomColIndex2 = Math.ceil(Math.random() * possibleCols.length);
      let currentRow = possibleRows[randomRowIndex];
      let colRandom1 = possibleCols[randomColIndex1];
      let colRandom2 = possibleCols[randomColIndex2];
      if(currentRow==undefined || colRandom1==undefined  || colRandom2==undefined )
      {
        possibleRows.splice(randomRowIndex,1);
        possibleCols.splice(randomColIndex1,1);
        continue
      }
      else{
        for(let k=colRandom1;k<colRandom2;k+=2)
        {
          var ans=0;
          for(let j=0;j<grid1.length;j+=1)
          {
            if(grid[currentRow][k]==grid1[j])
            {
              ans=1;
            }
          }
          if(ans==0)
          {
            if(grid[currentRow][k]!=startNode && grid[currentRow][k]!=finishNode)
          {
            grid1.push(grid[currentRow][k]);
          }
          }
        }
      }
      possibleRows.splice(randomRowIndex,1);
    possibleCols.splice(randomColIndex1,1);
    }
    }
    return grid1;
  }
  
  function chanceMazeH(grid, rowStart, rowEnd, colStart, colEnd, startNode, finishNode){
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

export default chanceMazeH;
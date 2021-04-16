function recursive(grid, rowStart, rowEnd, colStart, colEnd, startNode, finishNode,grid2,orientation,count) {
    let grid1=grid2;
    count++;
    console.log("count: ",count);
    // if(count==10)
    //   {
    //     return grid1;
    //   }
    if (rowEnd >= (grid.length) || colEnd >= grid[0].length || rowStart < 0 || colStart < 0) {
      // if(count==10)
      // {
        return grid1;
      // }
    }
    if (rowEnd < rowStart || colEnd < colStart) {
      // if(count==10)
      // {
        return grid1;
      // }
    }
    if(orientation==="horizontal")
    {
      // if(count==10)
      // {
      //   return grid1;
      // }
        let possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
        }
        let possibleCols = []
        for (let number = colStart-1; number <= colEnd+1; number += 2) {
            possibleCols.push(number);
        }
        var randomRowIndex = Math.ceil(Math.random() * possibleRows.length);
        var randomColIndex = Math.ceil(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];
        if(randomColIndex<possibleCols.length && randomRowIndex<possibleRows.length)
        {
        //   console.log("randomColIndex",randomColIndex);
        // console.log("randomRowIndex",randomRowIndex);
        // console.log("In horizontal");
        if (currentRow != undefined && colRandom != undefined) {
            if((currentRow!=startNode.col && colRandom!=startNode.row) || (currentRow != finishNode.col && colRandom != finishNode.row))
        {
            // console.log("currentRow", currentRow);
            // console.log("colRandom", colRandom);
            // console.log(grid);
            grid1.push(grid[currentRow][colRandom]);
        }
        }
        if(count<10)
        {
          if (currentRow - 2 - rowStart > colEnd - colStart) {
            recursive(grid, rowStart, currentRow - 2, colStart, colEnd, startNode, finishNode,grid1,orientation,count);
          } else {
            recursive(grid, rowStart, currentRow - 2, colStart, colEnd, startNode, finishNode,grid1,"vertical",count);
          }
          if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            recursive(grid, currentRow + 2, rowEnd, colStart, colEnd, startNode, finishNode,grid1,orientation,count);
          } else {
            recursive(grid, currentRow + 2, rowEnd, colStart, colEnd, startNode, finishNode,grid1,"vertical",count);
          }
        }
        else{
          return grid1;
        }
        }
    }
    else{
      // if(count==10)
      // {
      //   return grid1;
      // }
        let possibleCols = []
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        let possibleRows = [];
        for (let number = rowStart-1; number <=rowEnd; number += 2) {
            possibleRows.push(number);
        }
        var randomRowIndex = Math.ceil(Math.random() * possibleRows.length);
        var randomColIndex = Math.ceil(Math.random() * possibleCols.length);
        if(randomRowIndex<=possibleRows.length || randomColIndex<=possibleCols.length)
        {
        //   console.log("randomColIndex",randomColIndex);
        // console.log("randomRowIndex",randomRowIndex);
        // console.log("In vertical");
          let rowRandom = possibleRows[randomRowIndex];
        let currentCol = possibleCols[randomColIndex];
        if (rowRandom!= undefined && currentCol != undefined) {
            if((rowRandom!=startNode.col && currentCol!=startNode.row) || (rowRandom != finishNode.col && currentCol != finishNode.row))
        {
            // console.log("currentRow", rowRandom);
            // console.log("colRandom", currentCol);
            // console.log(grid);
            grid1.push(grid[rowRandom][currentCol]);
        }
        }
        if(count<10){
          if (rowEnd - rowStart > currentCol - 2 - colStart) {
            recursive(grid, rowStart,rowEnd, colStart, currentCol - 2, startNode, finishNode,grid1,"horizontal",count);
          } else {
            recursive(grid, rowStart, rowEnd, colStart, currentCol - 2, startNode, finishNode,grid1,orientation,count);
          }
          if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            recursive(grid, rowStart, rowEnd, colStart, currentCol + 2, startNode, finishNode,grid1,"horizontal",count);
          } else {
            recursive(grid, rowStart, rowEnd, colStart, currentCol + 2, startNode, finishNode,grid1,orientation,count);
          }
        }
        else{
          return grid1;
        }
        }
    }
return grid1
}


export default recursive;
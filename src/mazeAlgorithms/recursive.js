function recursive(grid, rowStart, rowEnd, colStart, colEnd, startNode, finishNode,count=0,grid2,orientation) {
    let grid1=grid2;
    count+=1;
    if(count==100){
        console.log("finish",count);
        return grid1;
    }
    if (rowEnd >= (grid.length) || colEnd >= grid.length || rowStart < 0 || colStart < 0) {
        return;
    }
    if(orientation=="horizontal")
    {
        
        let possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
        }
        let possibleCols = []
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        var randomRowIndex = Math.ceil(Math.random() * possibleRows.length);
        var randomColIndex = Math.ceil(Math.random() * possibleCols.length);
        let currentRow = possibleRows[randomRowIndex];
        let colRandom = possibleCols[randomColIndex];
        if (currentRow != undefined && colRandom != undefined) {
            if((currentRow!=startNode.col && colRandom!=startNode.row) || (currentRow != finishNode.col && colRandom != finishNode.row))
        {
            console.log("currentRow", currentRow);
            console.log("colRandom", colRandom);
            grid1.push(grid[currentRow][currentRow]);
        }
        }
        if (currentRow - 2 - rowStart > colEnd - colStart) {
            recursive(grid, rowStart, currentRow - 2, colStart, colEnd, startNode, finishNode,count,grid1,orientation);
          } else {
            recursive(grid, rowStart, currentRow - 2, colStart, colEnd, startNode, finishNode,count,grid1,"horizontal");
          }
          if (rowEnd - (currentRow + 2) > colEnd - colStart) {
            recursive(grid, currentRow + 2, rowEnd, colStart, colEnd, startNode, finishNode,count,grid1,orientation);
          } else {
            recursive(grid, currentRow + 2, rowEnd, colStart, colEnd, startNode, finishNode,count,grid1,"vertical");
          }
    }
    else{
        let possibleRows = [];
        for (let number = rowStart; number <= rowEnd; number += 2) {
            possibleRows.push(number);
        }
        let possibleCols = []
        for (let number = colStart; number <= colEnd; number += 2) {
            possibleCols.push(number);
        }
        var randomRowIndex = Math.ceil(Math.random() * possibleRows.length);
        var randomColIndex = Math.ceil(Math.random() * possibleCols.length);
        let rowRandom = possibleRows[randomRowIndex];
        let currentCol = possibleCols[randomColIndex];
        if (rowRandom!= undefined && currentCol != undefined) {
            if((rowRandom!=startNode.col && currentCol!=startNode.row) || (rowRandom != finishNode.col && currentCol != finishNode.row))
        {
            console.log("currentRow", rowRandom);
            console.log("colRandom", currentCol);
            grid1.push(grid[currentCol][rowRandom]);
        }
        }
        if (rowEnd - rowStart > currentCol - 2 - colStart) {
            recursive(grid, rowStart,rowEnd, colStart, currentCol - 2, startNode, finishNode,count,grid1,"horizontal");
          } else {
            recursive(grid, rowStart, rowEnd, colStart, currentCol - 2, startNode, finishNode,count,grid1,"horizontal");
          }
          if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
            recursive(grid, rowStart, rowEnd, colStart, currentCol + 2, startNode, finishNode,count,grid1,"horizontal");
          } else {
            recursive(grid, rowStart, rowEnd, colStart, currentCol + 2, startNode, finishNode,count,grid1,orientation);
          }
    }
}

export default recursive;
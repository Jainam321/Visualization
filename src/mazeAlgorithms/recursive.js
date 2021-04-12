function recursive(grid, rowStart, rowEnd, colStart, colEnd, startNode, finishNode) {
    if (rowEnd >= (grid.length) || colEnd >= grid.length || rowStart < 0 || colStart < 0) {
        // console.log("Return with first attempt");
        return;
    }
    let grid1 = []
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
    // console.log("randomRowIndex", randomRowIndex);
    // console.log("randomColIndex", randomColIndex);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    if (currentRow != null || colRandom != null) {
        // console.log("currentRow", currentRow);
        // console.log("colRandom", colRandom);
        // console.log("rowStart", rowStart);
        // console.log("rowEnd", rowEnd);
        // console.log("colStart", colStart);
        // console.log("colEnd", colEnd);
    }
    // if((currentRow!=startNode.col && colRandom!=startNode.row) || (currentRow != finishNode.col && colRandom != finishNode.row))
    // {
    //     grid1.push(grid[colRandom][currentRow]);
    // }
    // console.log(grid1);
    recursive(grid, rowStart, currentRow - 2, colStart, colEnd, startNode, finishNode);
}

export default recursive;
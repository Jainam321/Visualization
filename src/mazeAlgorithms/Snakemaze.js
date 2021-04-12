function Snake(grid, startNode, finishNode) {
    let grid1 = []
    let nrequired = []
    for (let k = 1; k < 10; k++) {
        for (let j = 1; j < 20; j++) {
            let x = Math.floor((Math.random() * 50) + 1);
            nrequired.push(grid[j][x]);
        }
    }
    for (var i = 1; i < 20; i += 2) {
        for (var j = 0; j < 50; j++) {
            if (grid[i][j] == startNode && grid[i][j] == finishNode) {
                continue;
            }
            else {
                if (grid[i][j] == startNode || grid[i][j] == finishNode) {
                    continue;
                }
                else {
                    let count = 1;
                    for (let z = 0; z < nrequired.length; z++) {
                        if (grid[i][j] == nrequired[z]) {
                            count = 0;
                        }
                    }
                    if (count == 1) {
                        grid1.push(grid[i][j]);
                    }
                }
            }
        }
    }
    for (var i = 2; i < 20; i += 2) {
        for (var j = 10; j < 30; j += 2) {
            if (grid[i][j] == startNode || grid[i][j] == finishNode) {
                continue;
            }
            else {
                grid1.push(grid[i][j - i + 10]);
            }
        }
    }
    for (var i = 1; i < 19; i += 2) {
        for (var j = 35; j < 50; j += 2) {
            if (grid[i][j] == startNode || grid[i][j] == finishNode) {
                continue;
            }
            else {
                grid1.push(grid[i][j - i]);
            }
        }
    }
    return grid1;
}

export default Snake;
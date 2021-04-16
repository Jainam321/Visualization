function Simplestair(grid, startNode, finishNode) {
  var grid1 = [];
  let x = grid.length;
  let y = 0;
  while (x < 2 * (grid.length) - 1 && y < grid.length - 4) {
    if (grid[y][x] == startNode || grid[y][x] == finishNode) {
      continue;
    }
    else {
      grid1.push(grid[y][x]);
    }
    x++;
    y++;
  };
  x = grid.length - 1;
  y = 0;
  while (x >= 0 && y < grid.length-1) {
    if (grid[y][x] == startNode || grid[y][x] == finishNode) {
      continue;
    }
    else {
      grid1.push(grid[y][x]);
    }
    x--;
    y++;
  };
  return grid1;
}

export default Simplestair;
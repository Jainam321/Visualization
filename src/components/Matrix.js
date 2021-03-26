import React, { useState, useEffect } from "react";
import "./Matrix.css";
import Node from "./Node";

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 15; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

function Matrix() {
  const [grid, setgrid] = useState([]);
  useEffect(() => {
    const grid1 = getInitialGrid();
    setgrid(grid1);
  });
  return (
    <>
      <center>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isFinish, isStart, isWall } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      row={row}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </center>
    </>
  );
}

export default Matrix;

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === 6 && col === 10,
    isFinish: row === 13 && col === 13,
    distance: Infinity,
    isVisited: false,
    isWall: false,
  };
};

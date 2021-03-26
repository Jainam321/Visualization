import React, { useEffect ,useState} from "react";
import "./Matrix.css";
import Node from "./Node";
import "./Node.css";
import dijkstra,{getNodesInShortestPathOrder} from "../algorithms/dijkstra";
import "./index.css";
import Button from "./Button"; 
import Heading from "./Heading";
import Dropdown from "./Dropdown"

function getInitialGrid () {
  const grid=[];
  for (let row = 0; row < 15; row++) {
    const rowgri=[];
    for (let col = 0; col < 40; col++) {
      rowgri.push(createNode(col, row));
    }
    grid.push(rowgri);
  }
  return grid;
};

function Matrix() {
  const [grid1, setgrid] = useState([]);
  useEffect(()=>{
    const grid2=getInitialGrid();
    setgrid(grid2);
  },[]);
  return (
    <>
      <div className="navbar">
                <Heading name="Path Visualization"></Heading>
            <ul>
                <Dropdown name="Algorithm"></Dropdown>
                <Dropdown name="Maze and pattern"></Dropdown>
                
                <button onClick={()=>visualizeDijkstra(grid1)}>Start</button>
                <Button title="Stop!"></Button>
            </ul>
        </div>
      <center>
        <div className="grid">
          {grid1.map((row, rowIdx) => {
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
    previousNode: null,
  };
};

function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
  for (let i = 0; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder);
      }, 10 * i);
      return;
    }
    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node-visited';
    }, 10 * i);
  }
}

function animateShortestPath(nodesInShortestPathOrder) {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      document.getElementById(`node-${node.row}-${node.col}`).className =
        'node-shortest-path';
    }, 50 * i);
  }
}

function visualizeDijkstra(grid1) {
  console.log("run");
  const startNode = grid1[6][10];
  const finishNode = grid1[7][13];
  const visitedNodes  = dijkstra(grid1, startNode, finishNode);
  const nodesInShortestPathOrder =  getNodesInShortestPathOrder(finishNode,startNode)
  animateDijkstra(visitedNodes, nodesInShortestPathOrder);
}

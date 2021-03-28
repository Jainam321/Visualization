import React, {useEffect ,useState, useRef} from 'react';
import Node from '../models/Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import './PathfindingVisualizer.css'; 
import {Nav, Navbar, Button, NavDropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 8;
const FINISH_NODE_COL = 39;


const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [noOfCellVisited, setNoOfCellVisited] = useState(0);
  const countRef = useRef(null)


  const handleStart = () => {
    setIsActive(true);
    setIsPaused(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  }

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(false);
  }

  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return `${getHours} : ${getMinutes} : ${getSeconds}`
  }

  useEffect(()=>{
    console.log('component mounted');
    const grid = getInitialGrid();
    setGrid(grid);
  },[])

  const handleMouseDown = (row, col) => {
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setGrid(newGrid);
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  }

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
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
          'node node-visited';
      }, 10 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) =>  {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
    handlePause();
  }

  const visualizeDijkstra = () => {
    handleStart();
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    setNoOfCellVisited(nodesInShortestPathOrder.length);
  }

  const clearBoard = () => {
    handleReset();
    setGrid(getInitialGrid());
    setNoOfCellVisited(0);
  }


  return (
    <>
      <Navbar bg="light" variant="light">
        <div className="container">
        <Navbar.Brand href="#home">Path Visualization</Navbar.Brand>
        <Nav className="mr-auto">
          <Navbar.Text>
            <span className="pText">Timer</span>
            <span className="timeBox">{formatTime()}</span>
            <span className="pText">No. of Cells Visited</span>
            <span className="timeBox">{noOfCellVisited}</span>
          </Navbar.Text>
          <NavDropdown title="Algorithms" id="basic-nav-dropdown">
            <NavDropdown.Item href="">Dijkstra</NavDropdown.Item>
            <NavDropdown.Item href="">**</NavDropdown.Item>
            <NavDropdown.Item href="">**</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <div className="m">
          <span className="pBtn">
            <Button variant="primary" onClick={() => visualizeDijkstra()}>Start</Button>
          </span>
          <span>
            <Button variant="primary" onClick={() => clearBoard()}>Clear Board</Button>
          </span>
        </div>
        </div>        
      </Navbar>
      
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const {row, col, isFinish, isStart, isWall} = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) =>
                      handleMouseEnter(row, col)
                    }
                    onMouseUp={() => handleMouseUp()}
                    row={row}></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}



const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
};

const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
  

export default PathfindingVisualizer;
import React, {useEffect ,useState, useRef} from 'react';
import dijkstra,{getNodesInShortestPathOrderDijkstra} from '../algorithms/dijkstra';
import BFS,{getNodesInShortestPathOrderBFS} from '../algorithms/BFS';
import DFS,{getNodesInShortestPathOrderDFS} from '../algorithms/DFS';
import {Nav, Navbar, Button, NavDropdown, Toast} from 'react-bootstrap';
import Node from '../models/Node/Node';
import './PathfindingVisualizer.css'; 
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
  const [algorithm, setAlgorithm] = useState("Choose Algorithm");
  const [show, setShow] = useState(false);
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

  const animateAlgorithm = (visitedNodesInOrder, nodesInShortestPathOrder) => {
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

  const visualizeAlgorithm = () => {
    handleStart();
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    let visitedNodesInOrder, nodesInShortestPathOrder;
    if(algorithm == "Dijkstra"){
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrderDijkstra(finishNode,startNode);
    }
    else if(algorithm == "BFS"){
      visitedNodesInOrder = BFS(grid, startNode, finishNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode,startNode);
    }
    else if(algorithm == "DFS"){
      visitedNodesInOrder = DFS(grid, startNode, finishNode);
      nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode,startNode);
    }
    else{
      setShow(true);
      handlePause();
      return;
    }
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
    setNoOfCellVisited(nodesInShortestPathOrder.length);
  }

  const clearBoard = () => {
    handleReset();
    setGrid(getInitialGrid());
    setNoOfCellVisited(0);
    clearGrid();
    // setAlgorithm("Choose Algorithm");
    document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node node-start';
    document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node node-finish';
  }

  const clearGrid = () => {
      const newGrid = grid;
      for (const row of newGrid) {
        for (const node of row) {
          let nodeClassName = document.getElementById(`node-${node.row}-${node.col}`,).className;
          if( nodeClassName !== 'node node-start' && 
              nodeClassName !== 'node node-finish' && 
              nodeClassName !== 'node node-wall') {
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node';
          }
        }
      }
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
          <NavDropdown title={algorithm} id="basic-nav-dropdown">
            <NavDropdown.Item href="" onClick={() => setAlgorithm("Dijkstra")}>Dijkstra</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => setAlgorithm("BFS")}>BFS</NavDropdown.Item>
            <NavDropdown.Item href="" onClick={() => setAlgorithm("DFS")}>DFS</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <div>

        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide 
          style={{
            position: 'absolute',
            top: 0,
            right: "50%",
          }}>
          <Toast.Header>
            <strong className="mr-auto">First Choose Algorithm</strong>
          </Toast.Header>
        </Toast>
        </div>
        <div className="m">
          <span className="pBtn">
            <Button variant="primary" onClick={() => visualizeAlgorithm()}>Start</Button>
          </span>
          <span>
            <Button variant="secondary" onClick={() => clearBoard()}>Clear Board</Button>
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

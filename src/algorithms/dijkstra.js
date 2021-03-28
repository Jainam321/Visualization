<<<<<<< HEAD
export default function dijikstra(grid,startnode,endnode){
    startnode.distance=0;
    const visited = new Map();
    const visitList = [];
    visitList.push(startnode);
    const graph=creategraph(grid);
    console.log("algorithm")
    while(visitList.length !== 0) {
        const node = visitList.shift();
        if(node && !visited.has(node)) {
            visited.set(node);
            console.log(node.row);
            console.log(node.col);
            if(node===endnode){
                return true;
            }
            graph.getAdjacents(node).forEach(adj => visitList.push(adj));
            updateUnvisitedNeighbors(visitList,node,graph);
            sortnodebydistance(visitList);
        }
    }
    return false;
}

function creategraph(grid){
    const graph=new Graph(600);
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 40; col++) {
          graph.addVertex(grid[row][col]);
        }
    }
    for (let row = 0; row < 15; row++) {
        for (let col = 0; col < 40; col++) {
            if((col+1<40)){
                graph.addEdge(grid[row][col],grid[row][col+1]);
            }
            if((row+1)<15){
                graph.addEdge(grid[row][col],grid[row+1][col]);
            }
            if((col-1)>=0){
                graph.addEdge(grid[row][col],grid[row][col-1]);
            }
            if((row-1)>=0){
                graph.addEdge(grid[row][col],grid[row-1][col]);
            }         
               
        }
      }
    return graph;
}

class Graph { 
    constructor(noOfVertices) { 
        this.noOfVertices = noOfVertices; 
        this.AdjList = new Map(); 
    }
    addVertex(v) { 
    this.AdjList.set(v, []); 
    } 
    addEdge(v, w) { 
    this.AdjList.get(v).push(w);
    }
    getAdjacents(node) {
        return this.AdjList.get(node);
    }
    
    isAdjacent(node,neighbor) {
        var temp=0;
        this.AdjList.get(node).forEach(adj => {
            if(adj === neighbor){
                temp++;
            }
        })
        if(temp===0){
            return false;
        }else{
            return true;
        }
    }
} 

function sortnodebydistance(unvisitednodes){
    unvisitednodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(visitList,node,graph) {
    for (const neighbor of visitList) {
        if((neighbor.previousNode !== null && neighbor.distance <= node.distance)  || !graph.isAdjacent(node,neighbor) ){
            continue;
        }else if(graph.isAdjacent(node,neighbor)){
            neighbor.distance = node.distance + 1;
            neighbor.previousNode = node;
        }
    }
  }

export function getNodesInShortestPathOrder(finishNode,startNode) {
    const nodesInShortestPathOrder = [];
    console.log("Display shortest path.")
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      console.log(currentNode.row);
      console.log(currentNode.col);
      currentNode = currentNode.previousNode;
      if(currentNode===startNode){
          console.log(currentNode.row);
          console.log(currentNode.col);
          break;
      }
    }
    return nodesInShortestPathOrder;
}
=======
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
>>>>>>> f2c73707c909e6cef4a089c8127752c5d2bcacfd

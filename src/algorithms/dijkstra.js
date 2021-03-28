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
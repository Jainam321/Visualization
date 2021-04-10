
export default function BFS(grid,startNode, finishNode){
    if(startNode==finishNode || !startNode || !finishNode){
        return false;
    }
    // console.log("in BFS");
    var count=0;
    startNode.distance=0;
    const visited=new Map();
    const visitedinorder=[];
    const visitList=[];
    visitList.push(startNode)
    const graph=creategraph(grid);
    while(visitList.length!==0)
    {
        const node =visitList.shift();
        if(node && !visited.has(node))
        {
            if (node.isWall) continue;
            visitedinorder.push(node);
            count++;
            visited.set(node);
            // console.log("visited");
            // console.log(node.row);
            // console.log(node.col);
            if(node===finishNode){
                // console.log("count",count);
                return visitedinorder;
            }
            graph.getAdjacents(node).forEach(adj => visitList.push(adj));
            updateUnvisitedNeighbors(visitList,node,graph);
        }
    }
    return visitedinorder;

}



function creategraph(grid){
    const graph=new Graph(1000);
    for(let row=0;row<20;row++)
    {
        for(let col=0;col<50;col++)
        {
            graph.addVertex(grid[row][col]);
        }
    }
    for(let row=0;row<20;row++)
    {
        for(let col=0;col<50;col++)
        {
            if((col+1<50)){
                graph.addEdge(grid[row][col],grid[row][col+1]);
            }
            if((col-1>=0)){
                graph.addEdge(grid[row][col],grid[row][col-1]);
            }
            if((row-1)>=0){
                graph.addEdge(grid[row][col],grid[row-1][col]);
            }
            if((row+1)<20){
                graph.addEdge(grid[row][col],grid[row+1][col]);
            }
        }
    }
    return graph;
}


class Graph{
  constructor(noOfVertices){
      this.noOfVertices=noOfVertices;
      this.Adjlist=new Map();
  }  

  addVertex(v){
    this.Adjlist.set(v,[]);
  }

  addEdge(v,w){
     this.Adjlist.get(v).push(w);
  }

  getAdjacents(node){
      return this.Adjlist.get(node);
  }

  isAdjacent(node,neighbor) {
    var temp=0;
    this.Adjlist.get(neighbor).forEach( x => {
        if(x==node){
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

function updateUnvisitedNeighbors(visitList,node,graph) {
    console.log("neigbour");
    for (const neighbor of visitList) {
        if(!graph.isAdjacent(node,neighbor) || neighbor.previousNode !== null){
            continue;
        }else if(graph.isAdjacent(node,neighbor)){
            neighbor.distance = node.distance + neighbor.weight + 1;
            neighbor.previousNode = node;
        }
    }
  }

export function getNodesInShortestPathOrderBFS(finishNode,startNode) {
    // console.log("shortest Path");
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
    //   console.log(currentNode.row);
    //   console.log(currentNode.col);
      currentNode = currentNode.previousNode;
      if(currentNode===startNode){
        //   console.log(currentNode.row);
        //   console.log(currentNode.col);
          break;
      }
    }
    return nodesInShortestPathOrder;
  }

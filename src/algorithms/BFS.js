
function BFS(grid,startNode, finishNode){
    // if(startNode==finishNode || !startNode || !finishNode){
    //     return false;
    // }
    var count=0;
    startNode.distance=0;
    const visited=new Map();
    const visitList=[];
    visitList.push(startNode)
    const graph=creategraph(grid);
    while(visitList.length!==0)
    {
        const node =visitList.shift();
        console.log(graph.getAdjacents(node));
        console.log(visited);
        if(node && !visited.has(node))
        {
            count++;
            visited.set(node);
            console.log("visited");
            console.log(node.row);
            console.log(node.col);
            if(node===finishNode){
                console.log("count",count);
                return true 
            }
            graph.getAdjacents(node).forEach(adj => visitList.push(adj));
            // updateUnvisitedNeighbors(visitList,node,graph);
        }
    }
    return false;

}



function creategraph(grid){
    const graph=new Graph(600);
    for(let row=0;row<15;row++)
    {
        for(let col=0;col<40;col++)
        {
            graph.addVertex(grid[row][col]);
        }
    }
    for(let row=0;row<15;row++)
    {
        for(let col=0;col<40;col++)
        {
            if((col+1<40)){
                graph.addEdge(grid[row][col],grid[row][col+1]);
            }
            if((col-1>=0)){
                graph.addEdge(grid[row][col],grid[row][col-1]);
            }
            if((row-1)>=0){
                graph.addEdge(grid[row][col],grid[row-1][col]);
            }
            if((row+1)<15){
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
    console.log(this.Adjlist);
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

// function updateUnvisitedNeighbors(visitList,node,graph) {
//     for (const neighbor of visitList) {
//         console.log(neighbor);
//         if(!graph.isAdjacent(node,neighbor)){
//             continue;
//         }else if(graph.isAdjacent(node,neighbor)){
//             neighbor.previousNode = node;
//         }
//     }
//   }

export default BFS;
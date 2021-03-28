
function Astar(grid1,startNode, finishNode){
    if(startNode==finishNode || !startNode || !finishNode){
        return false;
    }
    
    const graph=creategraph(grid1);
    console.log("Graph created");

}



function creategraph(grid){
    const graph=new Graph();
    for(let row=0;row<15;row++)
    {
        for(let col=0;col<=40;col++)
        {
            graph.addVertex(grid[row][col]);
        }
    }
    for(let row=0;row<15;row++)
    {
        for(let col=0;col<=40;col++)
        {
            if((col+1<40)){
                graph.addVertex(grid[row][col],grid[row][col+1]);
            }
            if((col-1>=0)){
                graph.addVertex(grid[row][col],grid[row][col-1]);
            }
            if((row-1)>=0){
                graph.addVertex(grid[row][col],grid[row-1][col]);
            }
            if((row+1)<15){
                graph.addVertex(grid[row][col],grid[row+1][col]);
            }
        }
    }
    return graph;
}


class Graph{
  constructor(noOfVertices){
      this.noOfVertices=noOfVertices;
      this.Adjlist=new Map()
  }  

  addVertex(v){
      this.Adjlist.set(v,[]);
  }

  addEdge(v,w){
      this.Adjlist.get(v).push(w);
  }

  getAdjacents(node){
      return this.Adjlist.get(node)
  }

  isAdjacent(node,neighbor) {
    var temp=0;
    this.AdjList.get(node).forEach(adj => {
        if(adj === neighbor){
            temp++;
        }
    })
    if(temp==0){
        return false;
    }else{
        return true;
    }
}
}

export default Astar;
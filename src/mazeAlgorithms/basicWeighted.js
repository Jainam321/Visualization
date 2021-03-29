function basicWeighted(grid,startNode, finishNode){
    var grid1=[]
    for(var i=0 ; i<20;i+=3)
    {
         for (var j=0 ;j<50;j+=3)
         {
              var x=Math.floor((Math.random() * 10) + 1);
              var col=Math.abs(i-x);
              var row=Math.abs(j-x);
              if(col==startNode.col && row==startNode.row)
              {
                   continue;
              }
              else if(col==finishNode.col && row==finishNode.row)
              {
                   continue;
              }
              grid1.push(grid[col][row]);
         }
    }
    return grid1;
}


export default basicWeighted;
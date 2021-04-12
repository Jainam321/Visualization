import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function Cards(props) {
  return (
    // <Card border="light" style={{ width: '15rem' }}>
    <Card border="light" style={{ width: 'fit-content' }}>
      <Button variant="outline-secondary" href="https://www.youtube.com/" >
        Algorithm: {props.algo} <br />
        Maze Pattern: {props.maze1} <br />
        No. of cells visited: {props.cells} <br />
        Total Cost: {props.tc} <br />
        Time taken for {props.algo} : {props.time1} ms

      </Button>

    </Card>
  )
}

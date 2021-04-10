import React from 'react';
import { Card, Button } from 'react-bootstrap';


export default function Cards(props) {
  return (
      <Card border="light" style={{ width: '15rem' }}>
          {/* <Card.Text> */}
          <Button variant="light" href="#">

            Chosen Algorithm: {props.algo} <br/>
            Total Cost: {props.tc} <br/>
            No. of cells visited: {props.cells}
            </Button>
          {/* </Card.Text> */}

              

      </Card>
  )
}

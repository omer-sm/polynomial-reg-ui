import React from 'react';
import './App.css';
import Chart from './Components/Chart';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Chart dataPointsArr={[[1, 4], [3, 5]]} functionWeights={[2, 4]}/>
      </Container>
    </div>
  );
}

export default App;

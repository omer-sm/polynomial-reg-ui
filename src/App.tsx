import React from 'react';
import './App.css';
import Chart from './Components/Chart';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
import ConfigSectionTitle from './Components/ConfigSectionTitle';
import DataPointsContainer from './Containers/DataPointsContainer';

function App() {
  const [dataPoints, setDataPoints] = React.useState<number[][]>([])
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Navbar style={{backgroundColor: "var(--bs-indigo)"}}>
            <h3 style={{fontFamily: "Inter", margin: "0.1rem 1rem", letterSpacing: "-0.05rem"}}>Polynomial Finder</h3>
          </Navbar>
        </Row>
        <Row>
          <Chart dataPointsArr={[[1, 4], [3, 5]]} functionWeights={[2, 4]}/>
        </Row>
        <Row style={{marginTop: "1rem"}}>
          <Col sm={12} md={4} xxl={2}>
            <ConfigSectionTitle title="Data"/>
            <DataPointsContainer dataPoints={dataPoints} setDataPoints={setDataPoints} />
          </Col>
          <Col sm={12} md={4} xxl={5}>
          <ConfigSectionTitle title="Regression"/>
          </Col>
          <Col sm={12} md={4} xxl={5}>
          <ConfigSectionTitle title="Stats"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

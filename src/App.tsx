import React from 'react';
import './App.css';
import Chart from './Components/Chart';
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Navbar from "react-bootstrap/Navbar"
import ConfigSectionTitle from './Components/ConfigSectionTitle';
import DataPointsContainer from './Containers/DataPointsContainer';
import RegressionSettingsForm from './Containers/RegressionSettingsForm';
import { trainAdaptive, trainUnadaptive, data} from './RegressionScript';

function App() {
  const [dataPoints, setDataPoints] = React.useState<number[][]>([])
  const [iterations, setIterations] = React.useState(0)
  const [learningRate, setLearningRate] = React.useState(0)
  const [xDegree, setXDegree] = React.useState(0)
  const [isRunning, setIsRunning] = React.useState(false)
  const startTraining = (isAdaptive: boolean) => {
    const xVals = dataPoints.map(p => { return p[0]})
    const yVals = dataPoints.map(p => { return p[1]})
    const weights = new Array(xDegree).fill(0)
    isAdaptive? trainAdaptive(xVals, yVals, weights, new Array(xDegree).fill(learningRate), iterations)
    : trainUnadaptive(xVals, yVals, weights, learningRate, iterations)
  }
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Navbar style={{backgroundColor: "var(--bs-indigo)"}}>
            <h3 style={{fontFamily: "Inter", margin: "0.1rem 1rem", letterSpacing: "-0.05rem"}}>Polynomial Finder</h3>
          </Navbar>
        </Row>
        <Row>
          <Chart dataPointsArrStateless={dataPoints} functionWeightsStateless={data.weights}/>
        </Row>
        <Row style={{marginTop: "1rem"}}>
          <Col sm={12} md={4} xxl={2}>
            <ConfigSectionTitle title="Data"/>
            <DataPointsContainer dataPoints={dataPoints} setDataPoints={setDataPoints} />
          </Col>
          <Col sm={12} md={4} xxl={5}>
          <ConfigSectionTitle title="Regression"/>
          <RegressionSettingsForm trainAdaptive={() => {startTraining(true)}} trainUnadaptive={() => {startTraining(false)}}
           iterations={iterations} setIterations={setIterations} 
           learningRate={learningRate} setLearningRate={setLearningRate}
           xDegree={xDegree} setXDegree={setXDegree} 
           isRunning={isRunning}/>
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

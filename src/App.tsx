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
import StatsContainer from './Containers/StatsContainer';
import TutorialModal from './Components/TutorialModal';

function App() {
  const [dataPoints, setDataPoints] = React.useState<number[][]>([])
  const [iterations, setIterations] = React.useState(0)
  const [learningRate, setLearningRate] = React.useState(0)
  const [xDegree, setXDegree] = React.useState(0)
  const [currentIteration, setCurrentIteration] = React.useState(0)
  const [currentCost, setCurrentCost] = React.useState(0)
  let [isRunning, setIsRunning] = React.useState(false)
  const startTraining = (isAdaptive: boolean) => {
    const xVals = dataPoints.map(p => { return p[0]})
    const yVals = dataPoints.map(p => { return p[1]})
    const startingWeights = new Array(xDegree).fill(0)
    isAdaptive? trainAdaptive(xVals, yVals, startingWeights, new Array(xDegree).fill(learningRate), iterations)
    : trainUnadaptive(xVals, yVals, startingWeights, learningRate, iterations)
  }
  const [weights, setWeights] = React.useState<number[]>(data.weights)
  React.useEffect(() => {
    const intervalID = setInterval(() => {
      setIsRunning(data.isRunning)
      if (data.isRunning) {
        setWeights([...data.weights])
        setCurrentIteration(data.iteration)
        setCurrentCost(data.j)
      }
    }, 100)
    return () => clearInterval(intervalID)
  }, [])
  const [tutorialShown, setTutorialShown] = React.useState(true)
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Navbar style={{backgroundColor: "var(--bs-indigo)", justifyContent: "space-between"}}>
            <h3 style={{fontFamily: "Inter", margin: "0.1rem 1rem", letterSpacing: "-0.05rem", textAlign: "start"}}>Polynomial Finder</h3>
            <p style={{fontFamily: "Inter", letterSpacing: "-0.05rem", textAlign: "end", margin: "0rem 1rem", alignSelf: "end"}}>by Omer Smorodinsky (<a href="https://github.com/omer-sm/polynomial-reg-ui" target="_blank" rel="noreferrer">GitHub</a>)</p>
          </Navbar>
        </Row>
        <TutorialModal show={tutorialShown} handleClose={() => setTutorialShown(false)}/>
        <Row>
          <Chart dataPointsArr={dataPoints} functionWeights={weights}/>
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
          <StatsContainer cost={currentCost} weights={weights} iteration={currentIteration} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

import React from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"


interface IRegressionSettingsFormProps {
    trainAdaptive: Function,
    trainUnadaptive: Function,
    iterations: number,
    setIterations: Function,
    learningRate: number,
    setLearningRate: Function,
    xDegree: number,
    setXDegree: Function,
    isRunning: boolean,
}

export default function RegressionSettingsForm(props: IRegressionSettingsFormProps) {
    const handleAdaptiveSubmit = () => {
        props.trainAdaptive(props.iterations, props.learningRate, props.xDegree)
    }
    const handleUnadaptiveSubmit = () => {
        props.trainUnadaptive(props.iterations, props.learningRate, props.xDegree)
    }
    const handleIterationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setIterations(parseInt(e.target.value))
    }
    const handleLearningRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setLearningRate(parseFloat(e.target.value))
    }
    const handleXDegreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setXDegree(parseInt(e.target.value))
    }
    return (
        <Stack style={{margin: "2rem 5% 0.5rem", width: "90%"}} gap={3}>
                <FloatingLabel label="Iterations" style={{display: "flex", flexDirection: "column"}}>
                    <Form.Control type="number" placeholder="0" value={props.iterations} onChange={handleIterationsChange} 
                    step="100" min="0"/>
                    <Form.Text muted style={{textAlign: "start", alignSelf: "start"}}>Recommended: 2000-5000</Form.Text>
                </FloatingLabel>
                <FloatingLabel label="Learning rate" style={{display: "flex", flexDirection: "column"}}>
                    <Form.Control type="number" placeholder="0" value={props.learningRate} onChange={handleLearningRateChange} step="0.001"/>
                    <Form.Text muted style={{textAlign: "start", alignSelf: "start"}}>Recommended: 100-0.01 for adaptive, 0.001-0.00001 for unadaptive</Form.Text>
                </FloatingLabel>
                <FloatingLabel label="Amount of terms" style={{display: "flex", flexDirection: "column"}}>
                    <Form.Control type="number" placeholder="0" value={props.xDegree} onChange={handleXDegreeChange} step="1" min="1"/>
                    <Form.Text muted style={{textAlign: "start", justifySelf: "start"}}>Recommended: 1-5</Form.Text>
                </FloatingLabel>
                <Row style={{display: "flex", justifyContent: "space-evenly"}}>
                <Button variant="primary" style={{justifySelf: "center", height: "90%", width: "40%"}} 
                disabled={props.isRunning} onClick={e => {handleAdaptiveSubmit()}}>Run (adaptive)</Button>
                <Button variant="secondary" style={{justifySelf: "center", height: "90%", width: "40%"}}
                 disabled={props.isRunning} onClick={e => {handleUnadaptiveSubmit()}}>Run (unadaptive)</Button>
                </Row>
        </Stack>
            
    )
}
import React from "react"
import Form from "react-bootstrap/Form"
import FloatingLabel from "react-bootstrap/FloatingLabel"
import Stack from "react-bootstrap/Stack"
import Button from "react-bootstrap/Button"

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
                    <Form.Text muted style={{textAlign: "start", alignSelf: "start"}}>Recommended: 0.001-0.00001</Form.Text>
                </FloatingLabel>
                <Stack direction="horizontal" gap={0} style={{display: "grid", gridTemplate: "1fr 1fr/ 2fr 1fr 1fr"}}>
                <FloatingLabel label="Highest degree of X" style={{display: "flex", flexDirection: "column"}}>
                    <Form.Control type="number" placeholder="0" value={props.xDegree} onChange={handleXDegreeChange} step="1" min="0"/>
                </FloatingLabel>
                <Button variant="primary" style={{justifySelf: "center", height: "90%"}} 
                disabled={props.isRunning} onClick={e => {handleAdaptiveSubmit()}}>Run (adaptive)</Button>
                <Button variant="secondary" style={{justifySelf: "center", height: "90%"}}
                 disabled={props.isRunning} onClick={e => {handleUnadaptiveSubmit()}}>Run (unadaptive)</Button>
                <Form.Text muted style={{textAlign: "start", alignSelf: "start", gridArea: "2 / 1 / 3 / 2"}}>Recommended: 1-5</Form.Text>
                </Stack>
        </Stack>
            
    )
}
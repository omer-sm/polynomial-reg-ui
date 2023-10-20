import React from "react"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"


interface IAddDataPointFormProps {
    addDataPoint: Function,
    xVal: number,
    setXVal: Function,
    yVal: number,
    setYVal: Function
}

export default function AddDataPointForm({addDataPoint, xVal, setXVal, yVal, setYVal}: IAddDataPointFormProps) {
    return (
        <>
        <Form.Label style={{textAlign: "start"}}>Add Point 
        (or <Badge className="btn btn-primary" style={{width: "fit-content"}}
        onClick={() => {addDataPoint(Math.round(Math.random()*100-25), Math.round(Math.random()*100-25))}}>🎲</Badge>)</Form.Label>
        <InputGroup style={{flexWrap: "nowrap"}}>
            <InputGroup.Text>X</InputGroup.Text>
            <Form.Control type="number" value={xVal} onChange={e => {setXVal(e.target.value)}}/>
            <InputGroup.Text>Y</InputGroup.Text>
            <Form.Control type="number" value={yVal} onChange={e => {setYVal(e.target.value)}}/>
            <Button variant="outline-primary" onClick={() => {addDataPoint(xVal, yVal)}}>+</Button>
        </InputGroup>
        </>
    )
}

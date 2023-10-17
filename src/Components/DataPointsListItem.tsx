import React from "react"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"


interface IDataPointsListProps {
    removePoint: Function,
    x: number,
    y: number,
    index: number
}

export default function DataPointsListItem({removePoint, x, y, index}: IDataPointsListProps) {
    return (
            <InputGroup style={{display: "grid", gridTemplate: "1fr / 1fr 2.5rem"}}>
                <InputGroup.Text>{`(${x}, ${y})`}</InputGroup.Text>
                <Button variant="outline-danger" onClick={() => {removePoint(index)}}>X</Button>
            </InputGroup>
    )
}



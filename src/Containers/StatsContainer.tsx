import React from "react"
import ListGroup from "react-bootstrap/ListGroup"
import Form from "react-bootstrap/Form"


interface IStatsContainerProps {
    cost: number,
    weights: number[],
    iteration: number,
    
}

const makeWeightText = (weight: number, i: number, len: number) => {
    return (
        <Form.Text muted style={{margin: "0"}}>{`${i === 0 ? "" : "+"} ${weight} ${i === 0 ? "" : " * x"}`}<sup>{i > 1 ? i : ""}</sup></Form.Text>
    )
}

export default function StatsContainer({cost, weights, iteration, }: IStatsContainerProps) {
    if (isNaN(cost)) {
        cost = -1 
    }
    weights = weights.map((weight) => { return isNaN(weight) ? 0 : weight})
    return (
        <ListGroup style={{margin: "2rem 5% 0.5rem", width: "90%"}}>
            <ListGroup.Item style={{textAlign: "start"}}>
                Current iteration: {iteration}
            </ListGroup.Item>
            <ListGroup.Item style={{textAlign: "start", display: "flex", flexDirection: "column", flexWrap: "nowrap"}}>
                Cost (J): {cost.toPrecision(3)}
                <Form.Text muted style={{margin: "0"}}>{cost}</Form.Text>
            </ListGroup.Item>
            <ListGroup.Item style={{textAlign: "start", display: "flex", flexDirection: "column", flexWrap: "nowrap"}} variant={cost === -1 ? "danger" : ""}>
                Function:
                {cost === -1 ? " invalid :(" : 
                weights.reverse().map((weight, i) => {return makeWeightText(weight, i, weights.length)})}
                {cost === -1 && <Form.Text style={{margin: "0"}} className="text-danger-emphasis">Try lowering your learning rate or amount of terms, and switching to adaptive training (if you aren't using it already)</Form.Text>}
            </ListGroup.Item>
        </ListGroup>
    )
}

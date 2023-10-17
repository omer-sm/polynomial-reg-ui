import React from "react"
import Stack from "react-bootstrap/Stack"
import DataPointsListItem from "../Components/DataPointsListItem"
import Card from "react-bootstrap/Card"


interface IDataPointsListProps {
    dataPoints: number[][],
    removePoint: Function,
    
}

export default function DataPointsList({dataPoints, removePoint, }: IDataPointsListProps) {
    
    return (
        <Card style={{width: "90%", padding: "0.5rem", maxHeight: "20rem", minHeight: "15rem", overflowY: "scroll"}}>
        <Stack gap={1}>
            {dataPoints.map((point, i) => {return <DataPointsListItem x={point[0]} y={point[1]} index={i} removePoint={removePoint}/>})}
        </Stack>
        </Card>
    )
}

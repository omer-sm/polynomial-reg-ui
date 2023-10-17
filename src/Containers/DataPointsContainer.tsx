import React from "react"
import AddDataPointForm from "../Components/AddDataPointForm"
import Row from "react-bootstrap/Row"
import DataPointsList from "./DataPointsList"

interface IDataPointsContainerProps {
    dataPoints: number[][],
    setDataPoints: React.Dispatch<React.SetStateAction<number[][]>>
}

export default function DataPointsContainer({dataPoints, setDataPoints}: IDataPointsContainerProps) {
    const [xVal, setXVal] = React.useState<number>(0)
    const [yVal, setYVal] = React.useState<number>(0)
    const addDataPoint = (x:number, y:number) => {
        dataPoints.push([x, y])
        const newData: number[][] = []
        dataPoints.forEach(el => {newData.push(el)})
        newData.sort((a, b) => {return a[0] - b[0]})
        setDataPoints(newData)
    }
    const removePoint = (index:number) => {
        dataPoints.splice(index, 1)
        const newData: number[][] = []
        dataPoints.forEach(el => {newData.push(el)})
        newData.sort((a, b) => {return a[0] - b[0]})
        setDataPoints(newData)
    }
    
    return (
        <>
        <Row style={{margin: "0.5rem 5%", width: "90%"}}>
            <AddDataPointForm addDataPoint={addDataPoint} xVal={xVal} setXVal={setXVal} yVal={yVal} setYVal={setYVal}/>
        </Row>
        <Row style={{margin: "0.5rem 5%", width: "90%", justifyContent: "center"}}>
            <DataPointsList dataPoints={dataPoints} removePoint={removePoint} />
        </Row>
        </>
    )
}
import React from "react"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts'
var CanvasJSChart = CanvasJSReact.CanvasJSChart

interface IChartProps {
    dataPointsArr: number[][],
    functionWeights: number[],

}
type chartPoint = {
    x: number,
    y: number
}
type chartNonLinePoint = {
    x: number,
    y: number[] | number
}

const createScatterPlot = (points: number[][]) => {
    const newPoints = points.map(point => { return { x: point[0], y: point[1] } })
    return newPoints.sort((a, b) => { return a.x - b.x })
}

const createErrorPlot = (points: number[][], linePoints: number[][]) => {
    const xPoints = points.map(point => point[0])
    let filteredLinePoints = linePoints.filter(point => xPoints.includes(point[0]))
    filteredLinePoints = filteredLinePoints.sort((a, b) => { return a[0] - b[0] })
    if (points.length > 1) {
    points = points.sort((a, b) => { return a[0] - b[0] })
    return filteredLinePoints.map((p, i) => { return { x: p[0], y: [p[1], points[i][1]] } })
    }
    return [{x: points[0][0], y: points[0][1]}]
}

const calcFunctionVal = (x: number, weights: number[]): number => {
    return weights.reduce((total, current, i) => total + current * (x ** i), 0)
}

const createLinePoints = (weights: number[], dataPoints: number[][]) => {
    const linePlot: number[][] = [[dataPoints[0][0] / 2, calcFunctionVal(dataPoints[0][0] / 2, weights)]]
    for (let i = 0; i < dataPoints.length - 1; i++) {
        linePlot.push([dataPoints[i][0], calcFunctionVal(dataPoints[i][0], weights)])
        linePlot.push([(dataPoints[i][0] + dataPoints[i + 1][0]) / 2, calcFunctionVal((dataPoints[i][0] + dataPoints[i + 1][0]) / 2, weights)])
    }
    linePlot.push([dataPoints[dataPoints.length - 1][0], calcFunctionVal(dataPoints[dataPoints.length - 1][0], weights)])
    if (dataPoints.length > 1) {
    linePlot.push([dataPoints[dataPoints.length - 1][0]*2 - dataPoints[dataPoints.length - 2][0], calcFunctionVal(dataPoints[dataPoints.length - 1][0]*2 - dataPoints[dataPoints.length - 2][0], weights)])
    }
    return linePlot
}

const createLinePlot = (plot: number[][]) => {
    return plot.map(p => { return { x: p[0], y: p[1] } })
}

export default function Chart({ dataPointsArr, functionWeights }: IChartProps) {
    const [nonLinePlot, setNonLinePlot] = React.useState<chartNonLinePoint[]>()
    const [linePlot, setLinePlot] = React.useState<chartPoint[]>()
    React.useEffect(() => {
        if (dataPointsArr.length) {
            if (functionWeights.length === 1 && functionWeights[0] === 0) {
                setNonLinePlot(createScatterPlot(dataPointsArr))
            } else {
                const points = createLinePoints(functionWeights, dataPointsArr)
                setLinePlot(createLinePlot(points))
                setNonLinePlot(createErrorPlot(dataPointsArr, points))
            }
        }
    }, [dataPointsArr, functionWeights])
    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark1",
        data: functionWeights.length === 1 && functionWeights[0] === 0 ? [{
            type: "scatter",
            dataPoints: nonLinePlot,
            markerSize: 15
        }] : [{
            type: "spline",
            dataPoints: linePlot
        },
        {
            type: "error",
            dataPoints: nonLinePlot
        }]
    }
    return (
        <div style={{ padding: "0" }}>
            <CanvasJSChart options={options} />
        </div>
    )
}
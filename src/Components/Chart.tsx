import React from "react"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface IChartProps {
    dataPointsArrStateless: number[][],
    functionWeightsStateless: number[],
}
type chartPoint = {
    x: number,
    y: number
}
type chartErrorPoint = {
    x: number,
    y: [number, number] | number
}

export default function Chart({dataPointsArrStateless, functionWeightsStateless}: IChartProps) {
    const [funcPlot, setFuncPlot] = React.useState<chartPoint[]>([])
    const [errorPlot, setErrorPlot] = React.useState<chartErrorPoint[]>([])
    const [dataPointsArr, setdataPointsArr] = React.useState<number[][]>([])
    React.useEffect(() => {
        setdataPointsArr(dataPointsArrStateless)
    }, [dataPointsArrStateless])
    const [functionWeights, setFunctionWeights] = React.useState<number[]>([])
    const calcFunctionVal = (x: number):number => {
        return functionWeights.reduce((total, current, i) => total + current*(x**i), 0)
    }
    const createFunctionPlot = (precision = 10) => {
        const xPoints = dataPointsArr.map(p => { return p[0]})
        const plotArr: chartPoint[] = [];
        for (let i = Math.min(...xPoints)-precision; i < Math.max(...xPoints)+precision; i += precision) {
            if (!xPoints.includes(i)) {
                plotArr.push({x: i, y: calcFunctionVal(i)})
            }
        }
        xPoints.forEach(point => plotArr.push({x: point, y: calcFunctionVal(point)}))
        return plotArr.sort((a, b) => a.x - b.x)
    }
    const createErrorPlot = (funcPlot: chartPoint[]) => {
        const xPoints = dataPointsArr.map(p => { return p[0]})
        const errorPlotArr: chartErrorPoint[] = []
        funcPlot.forEach(p => {
            if (xPoints.includes(p.x)) {
                dataPointsArr.forEach(point => { 
                    if (point[0] === p.x) {
                        errorPlotArr.push({x: p.x, y: functionWeights.length? [p.y, point[1]] : point[1]})
                    }
                })
            }
        })
        return errorPlotArr
    }
    React.useEffect(() => {
        setFunctionWeights(functionWeightsStateless)
        setFuncPlot(createFunctionPlot())
        setErrorPlot(createErrorPlot(funcPlot))
    }, [functionWeightsStateless])
    const options = {
        animationEnabled: true,
		exportEnabled: true,
        theme: "dark1",
        data: functionWeights.length? [{
          type: "spline",
          dataPoints: funcPlot
        },
        {
          type: "error",
          dataPoints: errorPlot
        }] : [
          {
            type: "scatter",
            markerSize: 15,
            dataPoints: errorPlot
          }]
      }
      return (
        <div style={{padding: "0"}}>
          <CanvasJSChart options = {options}/>
        </div>
      );
}
import React from "react"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface IChartProps {
    dataPointsArr: number[][],
    functionWeights: number[],
}
type chartPoint = {
    x: number,
    y: number
}
type chartErrorPoint = {
    x: number,
    y: [number, number]
}

export default function Chart({dataPointsArr, functionWeights}: IChartProps) {
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
                        errorPlotArr.push({x: p.x, y: [p.y, point[1]]})
                    }
                })
            }
        })
        return errorPlotArr
    }
    const funcPlot = createFunctionPlot()
    const errorPlot = createErrorPlot(funcPlot)
    const options = {
        animationEnabled: true,
		exportEnabled: true,
        theme: "dark1",
        data: [{
          type: "spline",
          dataPoints: funcPlot
        },
        {
          type: "error",
          dataPoints: errorPlot
        }]
      }
      return (
        <div style={{padding: "0"}}>
          <CanvasJSChart options = {options}/>
        </div>
      );
}
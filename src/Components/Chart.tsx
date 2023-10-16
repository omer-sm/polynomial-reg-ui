import React from "react"
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export interface IChartProps {
    dataPointsArr: number[][],
    functionWeights: number[],
}
type chartPoint = {
    x: number,
    y: number
}

export default function Chart({dataPointsArr, functionWeights}: IChartProps) {
    const calcFunctionVal = (x: number) => {
        
    }
    const createFunctionPlot = (precision = 10) => {
        const xPoints = dataPointsArr.map(p => { return p[0]})
        const plotArr: chartPoint[] = [];
        for (let i = Math.min(...xPoints)-precision; i < Math.max(...xPoints)-precision; i += precision) {
            plotArr.push({x: i, y: }
        }
    }
    const options = {
        animationEnabled: true,
		exportEnabled: true,
        theme: "dark1",
        data: [{
          type: "spline",
          dataPoints: [
            { x: 1,  y: 10  },
            { x: 2, y: 15  },
            { x: 3, y: 25  },
            { x: 4,  y: 30  },
            { x: 5,  y: 28  }
          ]
        },
        {
          type: "error",
          dataPoints: [
            { x: 1,  y: [10, 12]  },
            { x: 2, y: [15, 17]  },
            { x: 3, y: [25, 29]  },
            { x: 4,  y: [30, 20]  },
            { x: 5,  y: [28, 29]  }
          ]
        }]
      }
      return (
          <CanvasJSChart options = {options}/>
      );
}
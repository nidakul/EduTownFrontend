// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart() {
  const options = {
    title: {
      text: 'Not Ortalamaları',
    },
    data: [
      {
        type: 'column',
        dataPoints: [
          { label: '5. Sınıf', y: 95 },
          { label: '6. Sınıf', y: 75 },
          { label: '7. Sınıf', y: 65 },
          { label: '8. Sınıf', y: 40 },
        ],
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef = {ref => this.chart = ref} */
      />
    </div>
  );
}

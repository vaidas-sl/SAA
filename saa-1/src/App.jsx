import "./App.css";
import { Line } from "react-chartjs-2";
import { wma } from "./wma.ts"


const ema = (data) => data

const K = 5
const L = 10
const data = [12, 19, 3, 5, 2, 3,1,2,30,30,46,7,8,5,3,2,3,4,5,6,5,4,3,3,1,1,2,7,7,5,3,5,6,8,6,3,3,1]

const wmaData = wma(data, K, L)
const emaData = ema(data)

const chartData = {
  labels: data.map((_, idx) => idx.toString()),
  datasets: [
    {
      label: "Pradiniai duomenys",
      data: wmaData,
      fill: false,
      backgroundColor: "rgb(0, 0, 0)",
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    {
      label: "Slenkantis vidurkis su svoriais",
      data: wmaData,
      fill: false,
      backgroundColor: "rgb(255, 0, 0)",
      borderColor: "rgba(255, 0, 0, 0.5)",
    },
    {
      label: "Eksponentinis slenkantis vidurkis",
      data: emaData,
      fill: false,
      backgroundColor: "rgb(25, 99, 132)",
      borderColor: "rgba(25, 99, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },

  elements: {
    line: {
      tension: 0,
    },
  },
};

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="chart-container">
          <Line data={chartData} options={options} />
        </div>
      </header>
    </div>
  );
};

export default App;

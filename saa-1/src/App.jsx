import React, { useState } from "react";
import { TextField, Button, FormControl, FormLabel } from "@material-ui/core";

import "./App.css";
import { Line } from "react-chartjs-2";
import { wma, ema } from "./averages.ts";

const data = [
  12,
  19,
  3,
  5,
  2,
  3,
  1,
  2,
  30,
  30,
  46,
  7,
  8,
  5,
  3,
  2,
  3,
  4,
  5,
  6,
  5,
  4,
  3,
  3,
  1,
  1,
  2,
  7,
  7,
  5,
  3,
  5,
  6,
  8,
  6,
  3,
  3,
  1,
];

const getPrimaryData = ({ K, L, alfa }) => ({
  labels: data.map((_, idx) => idx.toString()),
  datasets: [
    {
      label: "Pradiniai duomenys",
      data: data,
      fill: false,
      backgroundColor: "rgb(0, 0, 0)",
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    {
      label: "Slenkantis vidurkis su svoriais",
      data: wma(data, K, L),
      fill: false,
      backgroundColor: "rgb(255, 0, 0)",
      borderColor: "rgba(255, 0, 0, 0.5)",
    },
    {
      label: "Eksponentinis slenkantis vidurkis",
      data: ema(data, alfa),
      fill: false,
      backgroundColor: "rgb(25, 99, 132)",
      borderColor: "rgba(25, 99, 132, 0.2)",
    },
  ],
});

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
  const [K, setK] = useState(5);
  const [L, setL] = useState(10);
  const [alfa, setAlfa] = useState(0.5);

  const [dataSource, setDataSource] = useState(() => getPrimaryData);

  return (
    <div className="App">
      <div className="form-container">
        <FormControl>
          <FormLabel className="form-label">
            Slenkancio vidurkio su svoriais parametrai
          </FormLabel>

          <div className="input-container">
            <TextField
              className="field"
              label="K"
              value={K}
              onChange={({ target }) => setK(parseFloat(target.value))}
              type={"number"}
              inputProps={{ min: 1 }}
            />

            <TextField
              className="field"
              label="L"
              value={L}
              onChange={({ target }) => setL(parseFloat(target.value))}
              type={"number"}
              inputProps={{ min: 0 }}
            />
          </div>
        </FormControl>
        <FormControl>
          <FormLabel className="form-label">
            Eksponentinio slenkancio vidurkio parametrai
          </FormLabel>

          <div className="input-container">
            <TextField
              className="field"
              label="alfa"
              value={alfa}
              onChange={({ target }) => setAlfa(parseFloat(target.value))}
              type={"number"}
              inputProps={{ step: 0.01, min: 0, max: 1 }}
            />
          </div>
        </FormControl>
      </div>
      
      <div className="input-container">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDataSource(() => getPrimaryData)}
        >
          Primary Data
        </Button>
      </div>
      <div className="chart-container">
        <Line
          data={dataSource({ K, L, alfa })}
          options={options}
          redraw={false}
        />
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  Switch,
  FormControlLabel,
  FormGroup,
} from "@material-ui/core";

import "./App.css";
import { Line } from "react-chartjs-2";
import { wma, ema } from "./averages.ts";
import { getOzoneDataset } from "./datasets/ozone";
import { getSunspotsDataset } from "./datasets/sunspots";
import { getLondonTempDataset } from "./datasets/london-temp";
import { getPhilPrecipDataset } from "./datasets/philadelphia-percip";
import { getMaunaLoaCo2 } from "./datasets/mauna-loa-co2";

const getChartData = (dataset) => ({
  K,
  L,
  alfa,
  wmaVisible,
  emaVisible,
  unprocessedDataVisible,
}) => ({
  data: {
    labels: dataset.labels,
    datasets: [
      unprocessedDataVisible && {
        label: "Pradiniai duomenys",
        data: dataset.data,
        fill: false,
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgba(0, 0, 0, 0.2)",
      },
      wmaVisible && {
        label: "Slenkantis vidurkis su svoriais",
        data: wma(dataset.data, K, L),
        fill: false,
        backgroundColor: "rgb(255, 0, 0)",
        borderColor: "rgba(255, 0, 0, 0.5)",
      },
      emaVisible && {
        label: "Eksponentinis slenkantis vidurkis",
        data: ema(dataset.data, alfa),
        fill: false,
        backgroundColor: "rgb(25, 99, 132)",
        borderColor: "rgba(25, 99, 132, 0.2)",
      },
    ].filter((x) => x),
  },
  options: {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: dataset.yAxisLabel,
          },
          ticks: {
            beginAtZero: false,
          },
        },
      ],

      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: dataset.xAxisLabel,
          },
        },
      ],
    },
    elements: {
      line: {
        tension: 0,
      },
    },
  },
});

const App = () => {
  const [K, setK] = useState(5);
  const [L, setL] = useState(10);
  const [alfa, setAlfa] = useState(0.5);
  const [wmaVisible, showWma] = useState(true);
  const [emaVisible, showEma] = useState(true);
  const [unprocessedDataVisible, showUnprocessedData] = useState(true);

  const [dataSource, setDataSource] = useState(() =>
    getChartData(getOzoneDataset())
  );

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
              inputProps={{ step: 0.001, min: 0, max: 1 }}
            />
          </div>
        </FormControl>
      </div>

      <div className="input-container">
        <FormControl component="fieldset">
          <FormLabel component="legend">Rodomi duomenys</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={unprocessedDataVisible}
                  onChange={({ target }) => showUnprocessedData(target.checked)}
                />
              }
              label="Pradiniai duomenys"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={wmaVisible}
                  onChange={({ target }) => showWma(target.checked)}
                />
              }
              label="Slenkantis vidurkis su svoriais"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={emaVisible}
                  onChange={({ target }) => showEma(target.checked)}
                />
              }
              label="Eksponentinis slenkantis vidurkis"
            />
          </FormGroup>
        </FormControl>
</div>
      <div className="chart-container">
        <Line
          {...dataSource({
            K,
            L,
            alfa,
            wmaVisible,
            emaVisible,
            unprocessedDataVisible,
          })}
          redraw={false}
        />
      </div>

      <div className='buttons-container'>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDataSource(() => getChartData(getOzoneDataset()))}
          >
            Ozone, arosa, 1932-72 
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDataSource(() => getChartData(getSunspotsDataset()))}
          >
            Zurich Sunspot Numbers 1749-1983 
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setDataSource(() => getChartData(getLondonTempDataset()))}
          >
            England temp 1723-1970
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setDataSource(() => getChartData(getPhilPrecipDataset()))}
          >
            Philadelphia percip. 1820-1950
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => setDataSource(() => getChartData(getMaunaLoaCo2()))}
          >
            Mauna Loa CO2. 1958-2020
          </Button>
        </div>
      
    </div>
  );
};

export default App;

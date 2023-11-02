import React, { Component } from "react";
// import { Line } from "react-chartjs-2";
import moment from "moment";
import { formatUnits } from "viem";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function VestingChart({
  start,
  cliff,
  end,
  symbol,
  total,
  decimals,
}: {
  start: number;
  cliff: number;
  end: number;
  symbol: string;
  total: number;
  decimals: number;
}) {
  console.log(start, cliff, end, symbol, total, decimals);
  function chartData() {
    return {
      datasets: [
        fromBaseDataset({
          data: getPoints(start, cliff, end),
        }),
      ],
    };
  }

  function getPoints(start: number, cliff: number, end: number) {
    const now = Date.now() / 1000; // normalize to seconds

    const points = [getDataPointAt(start)];

    // Add signitificant datapoints. Order matters.
    if (cliff < now) {
      points.push(getDataPointAt(cliff));
    }

    if (start < now && now < end) {
      points.push(getDataPointAt(now));
    }

    if (cliff > now) {
      points.push(getDataPointAt(cliff));
    }

    points.push(getDataPointAt(end));

    return points;
  }

  function getDataPointAt(date: number) {
    return {
      x: formatDate(date),
      y: getAmountAt(date),
    };
  }

  function formatDate(date: number) {
    return moment(date * 1000).format("MM/DD/YYYY HH:mm");
  }

  function getAmountAt(date: number) {
    const slope = (date - start) / (end - start);

    return total * slope;
  }

  function chartOptions() {
    return {
      legend: { display: false },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              format: "MM/DD/YYYY HH:mm",
              tooltipFormat: "ll HH:mm",
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
            },
          },
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: symbol || "",
            },
          },
        ],
      },
    };
  }

  function fromBaseDataset(opts: any) {
    return {
      lineTension: 0.1,
      backgroundColor: "rgba(92,182,228,0.4)",
      borderColor: "rgba(92,182,228,1)",
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(92,182,228,1)",
      pointBackgroundColor: "rgba(92,182,228,1)",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(92,182,228,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointHitRadius: 10,
      ...opts,
    };
  }
  // @ts-ignore
  return <Line data={chartData()} options={chartOptions()} />;
}

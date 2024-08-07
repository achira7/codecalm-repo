import React from "react";
import { Bar } from "react-chartjs-2";
import { Color } from "../../theme/Colors";

const TwoValueBarChart = ({ data, period }) => {
  const labels = Object.keys(data).map(day => `${day}`);
  let focusedValues = [];
  let notFocusedValues = [];

  if (period === "daily" || period === "weekly" || period === "monthly") {
    focusedValues = labels.map((key) => data[key].focused);
    notFocusedValues = labels.map((key) => data[key].unfocused);
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Focused",
        data: focusedValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Not Focused",
        data: notFocusedValues,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: Color.chartText 
        }
      },
      tooltip: {
        titleColor: 'blue',
        bodyColor: 'green',
        callbacks: {
          label: function (tooltipItem) {
            const label = chartData.labels[tooltipItem.dataIndex] || '';
            const value = chartData.datasets[tooltipItem.datasetIndex].data[tooltipItem.dataIndex];
            return `${label}: ${value} seconds`;
          }
        }
      }
    },
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: period === "daily" ? 'Hour' : period === "weekly" ? 'Day of the Week' : 'Day of the Month',
          color: Color.chartText
        },
        ticks: {
          color: Color.chartText,  
        },
        grid: {
          color: Color.chartGrids,  
        }
      },
      y: {
        title: {
          display: true,
          text: 'Level',
          color: Color.chartText
        },
        beginAtZero: true,
        ticks: {
          color: Color.chartText,  
        },
        grid: {
          color: Color.chartGrids, 
        }
      }
    }
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TwoValueBarChart;

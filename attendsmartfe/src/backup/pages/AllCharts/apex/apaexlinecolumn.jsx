import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const Apaexlinecolumn = ({ dataColors }) => {
  const apaexlineColumnColors = getChartColorsArray(dataColors);
  const series = [
    {
      name: "Net Profit",
      data: [46, 57, 59, 54, 62, 58],
    },
    {
      name: "Revenue",
      data: [74, 83, 102, 97, 86, 106],
    }
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "60%",
        endingShape: "rounded",
        borderRadius: 5,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last"
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    colors: apaexlineColumnColors,
    xaxis: {
      categories: [
        ["Morning", "8:00 - 11:00 AM"],
        ["Noon", "11:00 AM - 2:00 PM"],
        ["AfterNoon", "2:00 PM - 5:00 PM"],
        ["Evening", "5:00 PM - 8:00 PM"],
        ["Night", "8:00: PM - 12:00 PM"],
        ["After Hours", "12:00 AM - 8:00 AM"]
      ],
      labels: {
        style: {
          fontSize: 10
        },
      }
    },
    yaxis: {
      title: {
        text: "Percentage",
      },
    },
    grid: {
      borderColor: "#f1f1f1",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height={350} />
  );
};

export default Apaexlinecolumn;

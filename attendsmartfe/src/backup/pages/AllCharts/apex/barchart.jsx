import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";

const barchart = ({ dataColors }) => {
  const spineareaChartColors = getChartColorsArray(dataColors);

  const series = [
    {
      data: [380, 430, 450, 475, 550, 584, 780, 1100],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 6,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last"
      },
    },
    dataLabels: {
      enabled: false,
    },

    colors: spineareaChartColors,
    grid: {
      borderColor: "#f1f1f1",
    },
    xaxis: {
      categories: [
        "Facebook",
        "Google",
        "Indeed",
        "Linkedin",
        "myCna",
        "Apply",
        ["Website", "Chat"],
        "Direct",
        "Others"
      ],
      title: {
        text: "Hired Count",
      },
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="bar" height="350" />
  );
};

export default barchart;

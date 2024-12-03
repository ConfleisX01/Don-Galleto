import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const RadialChart = () => {
  const getChartOptions = () => ({
    series: [90, 85, 70, 90],
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#ff5733"],
    chart: {
      height: "380px",
      width: "100%",
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        track: {
          background: '#E5E7EB',
        },
        dataLabels: {
          show: false,
        },
        hollow: {
          margin: 0,
          size: "32%",
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -23,
        bottom: -20,
      },
    },
    labels: ["Elemento 1", "Elemento 2", "Elemento 3", "Elemento 4"],
    legend: {
      show: true,
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: (value) => `${value}%`,
      },
    },
  });

  useEffect(() => {
    if (typeof ApexCharts !== "undefined") {
      const chart = new ApexCharts(document.querySelector("#radial-chart"), getChartOptions());
      chart.render();

      return () => chart.destroy();
    }
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <div className="flex justify-center items-center">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">
              Your team's progress
            </h5>
            <svg
              className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <div className="grid grid-cols-4 gap-2 mb-2">
          {[
            { label: "Elemento 1", value: 12, color: "orange" },
            { label: "Elemento 2", value: 23, color: "teal" },
            { label: "Elemento 3", value: 64, color: "blue" },
            { label: "Elemento 4", value: 64, color: "orange" }
          ].map((item) => (
            <dl
              key={item.label}
              className={`bg-${item.color}-50 dark:bg-gray-600 rounded-lg flex flex-col items-center justify-center h-[78px]`}
            >
              <dt
                className={`w-8 h-8 rounded-full bg-${item.color}-100 dark:bg-gray-500 text-${item.color}-600 dark:text-${item.color}-300 text-sm font-medium flex items-center justify-center mb-1`}
              >
                {item.value}
              </dt>
              <dd
                className={`text-${item.color}-600 dark:text-${item.color}-300 text-sm font-medium`}
              >
                {item.label}
              </dd>
            </dl>
          ))}
        </div>
      </div>

      <div className="py-6" id="radial-chart"></div>
    </div>
  );
};

export default RadialChart;
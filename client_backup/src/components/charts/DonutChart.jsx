import React, { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';

const DonutChart = ({ title, series, labels, label }) => {
    const [options, setOptions] = useState({
        series: series,
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
        chart: {
            height: 320,
            width: "100%",
            type: "donut",
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: { show: true, fontFamily: "Inter, sans-serif", offsetY: 20 },
                        total: {
                            show: true,
                            showAlways: true,
                            label: label,
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return sum + 'g';
                            },
                        },
                        value: { show: true, fontFamily: "Inter, sans-serif", offsetY: -20, formatter: value => value + "k" },
                    },
                    size: "80%",
                },
            },
        },
        labels: labels,
        dataLabels: { enabled: false },
        legend: { position: "bottom", fontFamily: "Inter, sans-serif" },
        yaxis: { labels: { formatter: value => value + "g" } },
        xaxis: {
            labels: { formatter: value => value + "g" },
            axisTicks: { show: false },
            axisBorder: { show: false },
        },
    })

    useEffect(() => {
        const chart = new ApexCharts(document.getElementById("donut-chart"), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between mb-3">
                <div className="flex items-center">
                    <h5 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h5>
                </div>
            </div>

            <div className="py-6" id="donut-chart"></div>
        </div>
    );
};

export default DonutChart;
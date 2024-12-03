import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

const AreaChartReport = ({ title, id }) => {
    useEffect(() => {
        const options = {
            chart: {
                height: "80%",
                width: "100%",
                type: "area",
                fontFamily: "Inter, sans-serif",
                dropShadow: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            tooltip: {
                enabled: true,
                x: {
                    show: false,
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    opacityFrom: 0.55,
                    opacityTo: 0,
                    shade: "#1C64F2",
                    gradientToColors: ["#1C64F2"],
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                width: 3,
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: 0,
                },
            },
            series: [
                {
                    name: "Ventas",
                    data: [65, 64, 64, 65, 63, 64],
                    color: "#1A56DB",
                },
            ],
            xaxis: {
                categories: [
                    "11 Noviembre",
                    "12 Noviembre",
                    "13 Noviembre",
                    "14 Noviembre",
                    "15 Noviembre",
                    "16 Noviembre",
                    "17 Noviembre",
                ],
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
        };

        const chart = new ApexCharts(document.getElementById(id), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [id]); // dependiendo del id es el grafico que genera

    return (
        <div className=" bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 bg-black">
            <div className="flex justify-between">
                <div>
                    <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">32.4k</h5>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">{title}</p>
                </div>
            </div>
            
            <div id={id}></div>
            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                <div className="flex justify-center items-center pt-5">
                    <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="lastDaysdropdown"
                        data-dropdown-placement="bottom"
                        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                        type="button"
                    >
                        Last 7 days
                        <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AreaChartReport;

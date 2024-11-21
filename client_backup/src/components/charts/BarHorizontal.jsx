import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function BarHorizontal() {
    useEffect(() => {
        const options = {
            series: [
                {
                    name: "Income",
                    color: "#31C48D",
                    data: [1420, 1620, 1820, 1420, 1650, 2120],
                },
                {
                    name: "Expense",
                    data: [788, 810, 866, 788, 1100, 1200],
                    color: "#F05252",
                },
            ],
            chart: {
                sparkline: {
                    enabled: false,
                },
                type: "bar",
                width: "100%",
                height: 400,
                toolbar: {
                    show: false,
                },
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: "100%",
                    borderRadius: 6,
                },
            },
            legend: {
                show: true,
                position: "bottom",
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: {
                shared: true,
                intersect: false,
                formatter: (value) => `$${value}`,
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        fontFamily: "Inter, sans-serif",
                        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                    },
                    formatter: (value) => `$${value}`,
                },
                categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        fontFamily: "Inter, sans-serif",
                        cssClass: "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                    },
                },
            },
            grid: {
                show: true,
                strokeDashArray: 4,
            },
        };

        const chart = new ApexCharts(document.getElementById("bar-chart"), options);
        chart.render();

        return () => chart.destroy();
    }, []);

    return (
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                <dl>
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Profit</dt>
                    <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">$5,405</dd>
                </dl>
                <div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
                        <svg
                            className="w-2.5 h-2.5 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13V1m0 0L1 5m4-4 4 4"
                            />
                        </svg>
                        Profit rate 23.5%
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 py-3">
                <dl>
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Income</dt>
                    <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">$23,635</dd>
                </dl>
                <dl>
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Expense</dt>
                    <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">-$18,230</dd>
                </dl>
            </div>

            <div id="bar-chart"></div>

            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
                <div className="flex justify-between items-center pt-5">
                    <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="lastDaysdropdown"
                        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 inline-flex items-center dark:hover:text-white"
                        type="button"
                    >
                        Last 6 months
                        <svg
                            className="w-2.5 m-2.5 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                            />
                        </svg>
                    </button>

                    <a
                        href="#"
                        className="uppercase text-sm font-semibold inline-flex items-center text-blue-600 hover:text-blue-700 dark:hover:text-blue-500"
                    >
                        Revenue Report
                        <svg
                            className="w-2.5 h-2.5 ms-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 6 10"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 9 4-4-4-4"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
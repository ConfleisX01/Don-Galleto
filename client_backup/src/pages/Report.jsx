import AreaChartReport from "../components/charts/AreaChartReport";
import BarChart from "../components/charts/BarChart";

export default function Reports() {
    return (
        <>
            <div className="w-full">
                <div className="p-2 shadow border col-span-1 rounded grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div className="col-span-1">
                        <AreaChartReport title="Resumen de Ventas 1" id="chart-1" />
                    </div>
                    <div className="col-span-1">
                        <AreaChartReport title="Resumen de Ventas 2" id="chart-2" />
                    </div>
                    <div className="col-span-1">
                        <AreaChartReport title="Resumen de Ventas 3" id="chart-3" />
                    </div>
                    <div className="col-span-1">
                        <AreaChartReport title="Resumen de Ventas 4" id="chart-4" />
                    </div>
                </div>

                <div className="p-2 shadow border col-span-1 rounded">
                    <div className="p-2">
                        <h2 className="font-medium text-center text-2xl">Gastos y Ganancia por Día semana</h2>
                    </div>
                    <BarChart />
                </div>
            </div>
        </>
    );
}

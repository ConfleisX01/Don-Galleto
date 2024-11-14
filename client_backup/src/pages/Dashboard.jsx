import AreaChart from "../components/charts/AreaChart";
import BarChart from "../components/charts/BarChart";
import TrafficCard from "../components/charts/DonutChart";
import Navbar from "../components/dashboard/Navbar";

export default function Dashboard() {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
                <div className="p-2 shadow border col-span-1 md:col-span-2 rounded">
                    <div className="w-full">
                        <Navbar title={'Notificaciones'} />
                        <div>
                            <TrafficCard
                                title={'Mermas'}
                                series={[400, 10, 500]}
                                labels={["Desperdicio", "Material Quemado", "Material en producción"]}
                                label={'Material Desperdiciado'}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-2 shadow border col-span-1 rounded">
                    <div className="p-2">
                        <h2 className="font-medium text-2xl">Resumen de ventas</h2>
                    </div>
                    <AreaChart title={'Resumen de ventas'} />
                </div>
                <div className="p-2 shadow border col-span-1 rounded">
                    <div className="p-2">
                        <h2 className="font-medium text-2xl">Resumen de inventario</h2>
                    </div>
                    <BarChart />
                </div>
            </div>
        </>
    );
}
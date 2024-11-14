import AreaChart from "../components/charts/AreaChart";
import BarChart from "../components/charts/BarChart";
import TrafficCard from "../components/charts/DonutChart";
import Navbar from "../components/dashboard/Navbar";

import { toast } from 'react-toastify'

export default function Dashboard() {
    const notify = () => toast.success("Wow so easy!");

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
                <div className="p-2 shadow border col-span-1 md:col-span-2 rounded">
                    <div className="w-full">
                        <Navbar title={'Notificaciones'} />
                        <div>
                            <TrafficCard
                                title={'Mermas'}
                                series={[220, 100, 500, 700]}
                                labels={["Desperdicio", "Material Quemado", "Material en producción", "Material Caduco"]}
                                label={'Material Desperdiciado'}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-2 shadow border col-span-1 rounded">
                    <div className="p-2">
                        <h2 className="font-medium text-2xl">Resumen de ventas</h2>
                    </div>
                    <AreaChart
                        title={'Resumen de ventas'}
                        categories={["01 February", "02 February", "03 February", "04 February", "05 February", "06 February", "07 February",]}
                        data={[10, 20, 30, 40, 50]}
                        label={'Ventas'}
                    />
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
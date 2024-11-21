import AreaChart from "../components/charts/AreaChart";
import BarChart from "../components/charts/BarChart";
import Navbar from "../components/dashboard/Navbar";
import DonutChart from '../components/charts/DonutChart'

import { toast } from 'react-toastify'
import { useEffect, useState } from "react";

const menu = [
    {
        label: 'Caducidad',
        isSelected: true
    },
    {
        label: 'Stock',
        isSelected: false
    },
    {
        label: 'Mermas',
        isSelected: false
    },
    {
        label: 'Prioritarias',
        isSelected: false
    }
]

export default function Dashboard() {
    const [sectionSelected, setSectionSelected] = useState([])
    const notify = () => toast.success("Wow so easy!");

    useEffect(() => {
        console.log(sectionSelected)
    }, [sectionSelected])

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
                <div className="p-2 shadow border col-span-1 md:col-span-2 rounded">
                    <div className="w-full">
                        <Navbar
                            title={'Notificaciones'}
                            sections={menu}
                            sectionSelected={setSectionSelected}
                        />
                        <div>
                            {
                                sectionSelected.length === 0 ? (
                                    <DonutChart
                                        title={'Caducidad'}
                                        series={[220, 100, 500, 700]}
                                        labels={["Desperdicio", "Material Quemado", "Material en producción", "Material Caduco"]}
                                        label={'Material Desperdiciado'}
                                    />
                                ) : sectionSelected[0]?.isSelected ? (
                                    <DonutChart
                                        title={'Caducidad'}
                                        series={[220, 100, 500, 700]}
                                        labels={["Desperdicio", "Material Quemado", "Material en producción", "Material Caduco"]}
                                        label={'Material Desperdiciado'}
                                    />
                                ) : sectionSelected[1]?.isSelected ? (
                                    <AreaChart
                                        title={'Stock'}
                                        categories={["01 February", "02 February", "03 February", "04 February", "05 February", "06 February", "07 February",]}
                                        data={[10, 20, 30, 40, 50]}
                                        label={'Ventas'}
                                    />
                                ) : sectionSelected[2]?.isSelected ? (
                                    <BarChart />
                                ) : sectionSelected[3]?.isSelected ? (
                                    <DonutChart
                                        title={'Prioritarias'}
                                        series={[220, 100, 500, 700]}
                                        labels={["Desperdicio", "Material Quemado", "Material en producción", "Material Caduco"]}
                                        label={'Material Desperdiciado'}
                                    />
                                ) : (
                                    <p>No chart selected</p>
                                )
                            }
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
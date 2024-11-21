import AreaChart from "../components/charts/AreaChart";
import BarChart from "../components/charts/BarChart";
import Navbar, { ItemNav } from "../components/dashboard/Navbar";

import { toast } from 'react-toastify'
import { useState } from "react";
import RadialChart from "../components/charts/RadialChart";
import DonutChart from "../components/charts/DonutChart";
import MaterialStats from "../components/Stat/MaterialStats";

const materials = [
    {
        material: 'Harina',
        quantity: '2',
        date: '25/12/2024'
    },
    {
        material: 'C. Chocolate',
        quantity: '1',
        date: '25/12/2024'
    },
    {
        material: 'Levadura',
        quantity: '0.5',
        date: '25/12/2024'
    },
    {
        material: 'Vainilla',
        quantity: '2',
        date: '25/12/2024'
    }
]

export default function Dashboard() {
    const [sectionSelected, setSectionSelected] = useState('Mermas')

    const notify = () => toast.success("Wow so easy!");

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
                <div className="p-2 shadow border col-span-1 md:col-span-2 rounded">
                    <div className="w-full">
                        <Navbar
                            title={'Notificaciones'}
                        >
                            {
                                ['Caducidad', 'Stock', 'Mermas', 'Prioritarias'].map(
                                    (label) => {
                                        return <ItemNav
                                            key={label}
                                            label={label}
                                            isSelected={sectionSelected === label}
                                            onClick={() => setSectionSelected(label)}
                                        />
                                    }
                                )
                            }
                        </Navbar>
                        <div className="flex justify-center">
                            {
                                sectionSelected === 'Caducidad' ? (
                                    <div className="stats shadow">
                                        {
                                        }
                                    </div>
                                ) : sectionSelected === 'Stock' ? (
                                    <RadialChart />
                                ) : sectionSelected === 'Mermas' ? (
                                    <DonutChart
                                        label={'Material Desperdiciado'}
                                        labels={['Quemado', 'Produccion', 'Desperdicio']}
                                        series={[40, 20, 35]}
                                    />
                                ) : sectionSelected === 'Prioritarias' ? (
                                    <p>hola</p>
                                ) : (<p>No se selecciono el chart</p>)
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
    )
}
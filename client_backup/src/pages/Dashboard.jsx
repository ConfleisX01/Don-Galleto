import Navbar from "../components/dashboard/Navbar";

export default function Dashboard() {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2">
                <div className="p-2 shadow border col-span-1 md:col-span-2 rounded">
                    <div className="w-full">
                        <Navbar
                            title={'Notificaciones'}
                        />
                    </div>
                </div>
                <div className="p-2 shadow border rounded">
                    <div className="w-full">
                        <h4 className="font-medium">Resumen de ventas</h4>
                    </div>
                </div>
                <div className="p-2 shadow border rounded">
                    <div className="w-full">
                        <h4 className="font-medium">Resumen de inventario</h4>
                    </div>
                </div>
            </div>
        </>
    )
}
import CardProduction from "../components/Production/cards";
import SearchInput from "../components/Production/searchInput";
import { useState, useEffect } from "react";
import { getAllOrdenes } from "../components/apiHandllerProduccion/APIProducion";


export default function Production() {
    const [lista, setLista] = useState([]); // Inicializa como array vacío
    const [error, setError] = useState(null); // Estado para errores
    const [loading, setLoading] = useState(true); // Estado para mostrar que está cargando

    // Función para obtener las órdenes
    async function fetchOrdenes() {
        try {
            const response = await getAllOrdenes();
            setLista(response.data || []); // Asegúrate de manejar casos sin datos
            setError(null); // Resetea errores al tener éxito
        } catch (err) {
            console.error("Error fetching ordenes:", err);
            setError("No se pudieron cargar las órdenes."); // Mensaje de error amigable
        } finally {
            setLoading(false); // Termina de cargar siempre
        }
    }

    useEffect(() => {
        fetchOrdenes();
    }, []);

    return (
        <>

            <div className="bg-white p-5 rounded-lg">
                <div className="flex mb-10">
                    <h1 className="font-medium text-4xl">Lista de producción</h1>
                </div>

                <div className="bg-white p-3 rounded-lg">
                    <SearchInput />
                    {/* Mostrar error, loading o lista */}
                    {loading ? (
                        <p className="m-10">Cargando órdenes...</p>
                    ) : error ? (
                        <p className="text-red-500 m-10">{error}</p>
                    ) : lista.length > 0 ? (
                        lista
                            .filter((orden) => orden.estatus !== 6 && orden.estatus !== 5) // Filtra las órdenes con estatus 4
                            .map((orden) => (
                                <CardProduction
                                    key={orden.id_orden}
                                    name={orden.nombre_receta}
                                    priority={orden.prioridad}
                                    numOrden={orden.id_orden}
                                    text={orden.procedimiento_receta}
                                    step={orden.estatus}
                                    onUpdate={fetchOrdenes}
                                />
                            ))
                    ) : (
                        <p className="m-10">No hay órdenes disponibles.</p>
                    )}
                </div>
            </div>
           
        </>

    );
}

import { GoPencil } from "react-icons/go";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

function TableMermas({ lista }) {
    const [selectedRow, setSelectedRow] = useState(null);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">Nombre</th>
                        <th className="px-6 py-3">Fecha</th>
                        <th className="px-6 py-3">Cantidad</th>
                        <th className="px-6 py-3">Razón</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((row) => (
                        <tr
                            key={row.id_merma}
                            className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                                selectedRow === row.id_merma ? "bg-blue-100" : ""
                            }`}
                            onClick={() => setSelectedRow(row.id_merma)}
                        >
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {row.nombre_insumo}
                            </td>
                            <td className="px-6 py-4">{row.fecha_registro}</td>
                            <td className="px-6 py-4">{row.cantidad}</td>
                            <td className="px-6 py-4">{row.razon_merma}</td>
                            <td className="px-6 py-4 flex">
                                {selectedRow === row.id && (
                                    <>
                                        <button
                                            type="button"
                                            className="flex w-[45px] h-[45px] rounded-lg justify-center items-center mx-2 border border-gray-300 shadow focus:outline-none"
                                        >
                                            <GoPencil />
                                        </button>
                                        <button
                                            type="button"
                                            className="flex w-[45px] h-[45px] rounded-lg justify-center items-center mx-2 border border-gray-300 shadow focus:outline-none"
                                        >
                                            <FaTrash />
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableMermas;

import { useState } from "react";
import { GoPencil } from "react-icons/go";
import { FaTrash } from 'react-icons/fa';
import SearchInput from "../components/Production/searchInput";
import SimpleDropDown from "../components/dropdown/simpleDropdow";

const options = [
    'Kilogramos',
    'Leche',
    'Miligramos',
    'Mililitros'
];

export default function Mermas() {
    const [selectedRow, setSelectedRow] = useState(null);

    // Datos de ejemplo
    const data = [
        { id: 1, nombre: "Galletas de coco", fecha: "Nov 23, 2021", cantidad: "10 Unidades", razon: "Exhibición" },
        { id: 2, nombre: "Leche", fecha: "Nov 23, 2021", cantidad: "2 litros", razon: "Se derramó" },
        { id: 3, nombre: "Vainilla", fecha: "Nov 23, 2021", cantidad: "30 ml", razon: "Se alcanzó la fecha de caducidad" }
    ];

    return (
        <div className='bg-gray-100 p-6'>
            <div className='flex mb-10'>
                <h1 className="font-medium text-4xl">Lista de producción</h1>
            </div>

            <div className="bg-white p-5 rounded-lg mb-4">
                <div className='flex mb-3 p-6'>
                    <div className='block w-[50%] mr-10'>
                        <label className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">Nombre del producto</label>
                        <input
                            type="text"
                            className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            required
                        />
                        <div className='block w-full'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cantidad</label>
                            <div className='flex'>
                                <input
                                    type="number"
                                    className="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder=""
                                    required
                                />
                                <SimpleDropDown options={options} placeholder="Unidad" />
                            </div>
                        </div>
                    </div>

                    <div className='w-[50%]'>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Razón de la merma
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Escribe la razón de la merma aquí"
                        ></textarea>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-medium px-10 py-5"
                    >
                        Guardar merma
                    </button>
                </div>
            </div>

            <div className='bg-white p-5'>
                <div className='m-6'>
                    <div className='m-5'>
                        <SearchInput />
                    </div>
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
                                {data.map((row) => (
                                    <tr
                                        key={row.id}
                                        className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ${
                                            selectedRow === row.id ? "bg-blue-100" : ""
                                        }`}
                                        onClick={() => setSelectedRow(row.id)}
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {row.nombre}
                                        </td>
                                        <td className="px-6 py-4">{row.fecha}</td>
                                        <td className="px-6 py-4">{row.cantidad}</td>
                                        <td className="px-6 py-4">{row.razon}</td>
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
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import TableMermas from '../components/mermasTable/MermasTale';
import SearchInput from "../components/Production/searchInput";
import SimpleDropDown from "../components/dropdown/simpleDropdow";
import { getAllMermas } from "../components/apiHandllerMermas/apiMermas";
import { insertMerma } from "../components/apiHandllerMermas/apiMermas";

const options = [
    "Kilogramos",
    "Leche",
    "Miligramos",
    "Mililitros",
];

export default function Mermas() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [lista, setLista] = useState([]);
    const [formData, setFormData] = useState({
        nombreInsumo: "",
        razon: "",
        unidad: "",
        cantidad: ""
    });

    // Fetch de las mermas
    async function fetchMermas() {
        try {
            const response = await getAllMermas();
            setLista(response.data);
        } catch (error) {
            console.log("Error fetching mermas", error);
        }
    }

    // Manejar cambios en el formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUnidadChange = (unidad) => {
        console.log(unidad)
        setFormData((prev) => ({
            ...prev,
            unidad,
        }));
    };

    // Insertar nueva merma
    async function handleSaveMerma() {
        console.log(formData)
        try {
            const response = await insertMerma(formData);
            if (response.success) {
                alert("Merma guardada con éxito");
                fetchMermas(); // Actualiza la lista de mermas
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log("Error al guardar merma", error);
        }
    }

    useEffect(() => {
        fetchMermas();
    }, []);

    return (
        <div className="bg-gray-100 px-6 sticky">
            {/* Formulario */}
            <div className="bg-white p-5 rounded-lg mb-4 sticky top-0 z-10">
                <div className="flex mb-3 p-6">
                    <div className="block w-[50%] mr-10">
                        <label className="block mb-5 text-sm font-medium text-gray-900 dark:text-white">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            name="nombreInsumo"
                            value={formData.nombreInsumo}
                            onChange={handleInputChange}
                            className="bg-gray-50 mb-6 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder=""
                            required
                        />
                        <div className="block w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Cantidad
                            </label>
                            <div className="flex">
                                <input
                                    type="number"
                                    name="cantidad"
                                    value={formData.cantidad}
                                    onChange={handleInputChange}
                                    className="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder=""
                                    required
                                />
                                <SimpleDropDown
                                    options={options}
                                    placeholder="Unidad"
                                    onSelect={(unidad) => {
                                        console.log("Callback recibido en Dropdown:", unidad);
                                        handleUnidadChange(unidad);
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-[50%]">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Razón de la merma
                        </label>
                        <textarea
                            id="message"
                            name="razon"
                            value={formData.razon}
                            onChange={handleInputChange}
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Escribe la razón de la merma aquí"
                        ></textarea>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSaveMerma}
                        className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-medium px-10 py-5"
                    >
                        Guardar merma
                    </button>
                </div>
            </div>

            {/* Tabla */}
            <div className="sticky top-0">
                <div className="bg-white p-5">
                    <div className="m-6">
                        <div className="m-5">
                            <SearchInput />
                        </div>
                        <TableMermas lista={lista} />
                    </div>
                </div>
            </div>
        </div>
    );
}

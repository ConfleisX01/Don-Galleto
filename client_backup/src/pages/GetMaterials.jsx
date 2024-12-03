import { FaBox } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";

import axios from 'axios'
import { useState } from "react";
import { materials } from "../components/config/materials";

export default function GetMaterials() {
    const [itemSelected, setItemSelected] = useState('')
    const [materialsData, setMaterialsData] = useState([])
    const [quantityPeticion, setQuantityPeticion] = useState(0)

    const searchMaterial = () => {
        axios.get('http://192.168.1.14:4001/inventory/getExternalMaterials', {
            params: { material: itemSelected }
        })
            .then(function (response) {
                console.log(response.data)
                setMaterialsData(response.data)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    return (
        <>
            <div>
                <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-lg text-center flex-none">
                        <h1 className="text-2xl font-bold sm:text-3xl">Solicitar Materiales a Otras Sucursales</h1>

                        <p className="mt-4 text-gray-500">
                            Realiza pedidos de materiales necesarios a otras sucursales de la franquicia para asegurar el abastecimiento adecuado en tu tienda.
                        </p>
                    </div>


                    <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                        <div>
                            <label className="form-control w-full max-w-lg">
                                <div className="label">
                                    <span className="label-text">Selecciona el material para pedir</span>
                                    <span className="label-text-alt"><FaBox /></span>
                                </div>
                                <select value={itemSelected} onChange={(e) => setItemSelected(e.target.value)} className="select select-bordered">
                                    <option disabled selected>Selecciona uno</option>
                                    {
                                        materials.map((material, index) => {
                                            return <option key={index} value={material.name}>{material.name}</option>
                                        })
                                    }
                                </select>
                            </label>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <button className="btn btn-primary w-full" onClick={() => searchMaterial()}>Buscar en sucursales</button>
                        </div>
                    </form>
                </div>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex flex-col lg:items-center">
                    <div className="overflow-x-auto w-full lg:w-1/2">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Material</th>
                                    <th>Sucursal</th>
                                    <th>Cantidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    materialsData.map((material, index) => {
                                        return <tr key={index}>
                                            <th>{material.nombre_insumo}</th>
                                            <td>Norte</td>
                                            <td>{material.cantidad}</td>
                                            <td className="flex gap-x-1">
                                                <input
                                                    value={quantityPeticion}
                                                    className="input input-bordered w-full"
                                                    type="number"
                                                    placeholder="Cantidad"
                                                    onChange={(e) => setQuantityPeticion(e.target.value)}
                                                />
                                                <button className="btn btn-primary"><FaTruck /></button>
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
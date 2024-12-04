import { FaBox } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";

import axios from 'axios'
import { useEffect, useState } from "react";

export default function GetMaterials() {
    const [itemSelected, setItemSelected] = useState('')
    const [materialsData, setMaterialsData] = useState([])
    const [quantityPeticion, setQuantityPeticion] = useState(0)
    const [urlFrom, setUrlFrom] = useState('')
    const [myMaterialsData, setMyMaterialsData] = useState([])

    const getAllMaterials = () => {
        axios.get('http://localhost:4001/inventory/getMaterials')
            .then(function (response) {
                setMyMaterialsData(response.data)
                console.log(response.data)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    const setMaterialToSearch = () => {
        return myMaterialsData[itemSelected - 1].nombre_insumo
    }

    const searchMaterial = () => {
        axios.get('http://localhost:4001/inventory/getSearchedMaterials', {
            params: { material: setMaterialToSearch() }
        })
            .then(function (response) {
                setMaterialsData(response.data)
                setUrlFrom(response.url)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    const askMaterials = (idMaterial) => {
        const data = {
            idMaterial: idMaterial,
            quantity: quantityPeticion
        }

        axios.post(urlFrom, data)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.error(error)
            })
    }

    useEffect(() => {
        getAllMaterials()
    }, [])

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
                                        myMaterialsData.map((material, index) => {
                                            return <option key={index} value={material.id_insumo}>{material.nombre_insumo}</option>
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
                                                <button className="btn btn-primary" onClick={() => askMaterials(material.id_insumo)}><FaTruck /></button>
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
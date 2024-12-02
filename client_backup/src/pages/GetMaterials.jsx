import { FaBox } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";

export default function GetMaterials() {
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
                                <select className="select select-bordered">
                                    <option disabled selected>Selecciona uno</option>
                                    <option>Star Wars</option>
                                    <option>Harry Potter</option>
                                    <option>Lord of the Rings</option>
                                    <option>Planet of the Apes</option>
                                    <option>Star Trek</option>
                                </select>
                            </label>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <button className="btn btn-primary w-full">Buscar en sucursales</button>
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
                                <tr>
                                    <th>Aceite</th>
                                    <td>Norte</td>
                                    <td>50 L</td>
                                    <td className="flex gap-x-1">
                                        <input className="input input-bordered w-full" type="number" placeholder="Cantidad" />
                                        <button className="btn btn-primary"><FaTruck /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
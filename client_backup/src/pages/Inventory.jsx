
import { FaBox } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { RiSearchFill } from "react-icons/ri";

import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { Link, Navigate } from "react-router-dom";

import axios from 'axios'

export default function Inventory() {
  const [materialsData, setMaterialsData] = useState([])

  const getAllMaterials = () => {
    axios.get('http://localhost:4001/inventory/getMaterials')
      .then(function (response) {
        console.log(response.data)
        setMaterialsData(response.data)
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
      <div className="w-full py-4 px-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
          {
            materialsData.map((material, index) => {
              return <Card
                key={index}
                nombreMaterial={material.nombre_insumo}
                fechaCaducidad={material.caducidad}
                cantidad={material.cantidad}
                unidadMedida={material.unidad}
              />
            })
          }
        </div>
        <div className="w-full mt-5">
          <button className="btn btn-error">Agregar Merma</button>
        </div>
      </div>
    </>
  )
}

function Card({ nombreMaterial, fechaCaducidad, cantidad, unidadMedida }) {

  const calcularDias = () => {
    const fechaActual = new Date()
    const nuevaFecha = new Date(fechaCaducidad)

    const diferenciaTiempo = nuevaFecha - fechaActual

    return Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24))
  }

  return (
    <>
      <div className={`indicator w-full p-2 py-5 border rounded-lg ${calcularDias() < 0 ? 'bg-gray-100' : ''}`}>
        {
          calcularDias() < 0 ?
            <span className="indicator-item indicator-end badge bg-red-300"><Link to={'/system/get_materials'} className="font-semibold text-red-600"><RiSearchFill /></Link></span> :
            calcularDias() < 6 ?
              <span className="indicator-item indicator-end badge badge-warning"><FaBell /></span> : null
        }
        <div className="flex w-full">
          <div className={calcularDias() < 0 ? 'hidden' : 'flex flex-col'}>
            <div className="radial-progress text-primary" style={{ "--value": cantidad }} role="progressbar">
              <FaBox />
            </div>
            <p className="mx-2 font-semibold">Queda: <span>{`${cantidad}${unidadMedida}`}</span></p>
          </div>
          <div className="text-center grow">
            <h2 className="font-bold text-lg">{nombreMaterial}</h2>
            <p className="font-semibold text-gray-600">Fecha de caducidad:</p>
            {(() => {
              const diasRestantes = Math.ceil(Math.abs(calcularDias()))
              const mensaje =
                calcularDias() < 0
                  ? `Caducado hace ${diasRestantes} días`
                  : calcularDias() == 0
                    ? "Caduca hoy"
                    : calcularDias() <= 6
                      ? `Caduca en ${diasRestantes} días`
                      : `Caduca en ${diasRestantes} días`;

              const claseTexto =
                calcularDias() < 0
                  ? "text-red-600 font-medium"
                  : calcularDias() <= 6
                    ? "text-yellow-300 font-medium"
                    : "text-green-600 font-medium";

              return <p className={claseTexto}>{mensaje}</p>;
            })()}
          </div>
        </div>
      </div>
    </>
  );
}

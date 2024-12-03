
import { FaBox } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";
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
            materialsData
              .sort((a, b) => new Date(a.caducidad) - new Date(b.caducidad))
              .map((material, index) => {
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
        <div className="w-full mt-5 flex gap-x-4">
          <button className="btn btn-error">Agregar Merma</button>
          <Link className="btn btn-info" to={'/system/get_materials'}>Buscar Materiales</Link>
        </div>
      </div>
    </>
  )
}

function Card({ nombreMaterial, fechaCaducidad, cantidad, unidadMedida }) {

  const calculateDays = () => {
    const fechaActual = new Date()
    const nuevaFecha = new Date(fechaCaducidad)

    const diferenciaTiempo = nuevaFecha - fechaActual

    return Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24))
  }

  const calculateMaterialProblems = () => {
    if (calculateDays() < 0)
      return <span className="indicator-item indicator-end badge bg-red-300"><RiSearchFill /></span>

    if (calculateDays() < 6)
      return <span className="indicator-item indicator-end badge badge-warning"><IoWarningOutline /></span>

  }

  return (
    <>
      <div className={`indicator w-full p-2 py-5 border rounded-lg shadow-sm ${calculateDays() < 0 ? 'bg-gray-100' : ''}`}>
        {
          calculateMaterialProblems()
        }
        <div className="flex w-full">
          <div className={calculateDays() < 0 ? 'hidden' : 'flex flex-col'}>
            <div className="radial-progress text-primary" style={{ "--value": cantidad }} role="progressbar">
              <FaBox />
            </div>
            <p className="mx-2 font-semibold">Queda: <span>{`${cantidad}${unidadMedida}`}</span></p>
          </div>
          <div className="text-center grow">
            <h2 className="font-bold text-lg">{nombreMaterial}</h2>
            <p className="font-semibold text-gray-600">Fecha de caducidad:</p>
            {(() => {
              const diasRestantes = Math.ceil(Math.abs(calculateDays()))
              const mensaje =
                calculateDays() < 0
                  ? `Caducado hace ${diasRestantes} días`
                  : calculateDays() == 0
                    ? "Caduca hoy"
                    : calculateDays() <= 6
                      ? `Caduca en ${diasRestantes} días`
                      : `Caduca en ${diasRestantes} días`;

              const claseTexto =
                calculateDays() < 0
                  ? "text-red-600 font-medium"
                  : calculateDays() <= 6
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

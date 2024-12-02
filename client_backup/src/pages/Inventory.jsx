import alerta from '../components/img/alerta.png';
import logoAzul from '../components/img/agua.png';
import provedor from '../components/img/provedor.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

import AreaChart from "../components/charts/AreaChart";
import BarChart from "../components/charts/BarChart";
import Navbar, { ItemNav } from "../components/dashboard/Navbar";
import { useState } from "react";
import { toast } from 'react-toastify'


export default function Inventory() {
  const [sectionSelected, setSectionSelected] = useState('Mermas')

  const data = [
    { nombre: 'Harina', fecha: 'EN 2 DÍAS', cantidad: '30 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Azúcar', fecha: 'EN 3 DÍAS', cantidad: '15 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Sal', fecha: 'EN 5 DÍAS', cantidad: '20 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Aceite', fecha: 'EN 7 DÍAS', cantidad: '10 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Leche', fecha: 'HOY', cantidad: '25 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Café', fecha: 'EN 10 DÍAS', cantidad: '5 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Harina', fecha: 'EN 2 DÍAS', cantidad: '30 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Azúcar', fecha: 'EN 3 DÍAS', cantidad: '15 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Sal', fecha: 'EN 5 DÍAS', cantidad: '20 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Aceite', fecha: 'EN 7 DÍAS', cantidad: '10 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Leche', fecha: 'HOY', cantidad: '25 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Café', fecha: 'EN 10 DÍAS', cantidad: '5 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Harina', fecha: 'EN 2 DÍAS', cantidad: '30 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Azúcar', fecha: 'EN 3 DÍAS', cantidad: '15 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Sal', fecha: 'EN 5 DÍAS', cantidad: '20 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Aceite', fecha: 'EN 7 DÍAS', cantidad: '10 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Leche', fecha: 'HOY', cantidad: '25 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Café', fecha: 'EN 10 DÍAS', cantidad: '5 KG', proveedor: 'PROVEEDOR' },
    { nombre: 'Harina', fecha: 'EN 2 DÍAS', cantidad: '30 KG', proveedor: 'PROVEEDOR' },

  ];

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>



      {/* Contenido principal */}
      <div
        className="container mt-5 p-4 rounded"
        style={{
          backgroundColor: '#f8f9fa',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
          flex: 1,
        }}
      >

        <Navbar
          title={'Notificaciones'}
        >
          {
            ['Producto avencer/poco stock', 'Registro de material', 'Provedores', '...'].map(
              (label) => {
                return <ItemNav
                  key={label}
                  label={label}
                  isSelected={sectionSelected === label}
                  onClick={() => setSectionSelected(label)}
                />
              }
            )
          }
        </Navbar>
        <h1
          className="text-center mb-4"
          style={{ color: '#343a40', fontWeight: 'bold' }}
        >
          Inventario
        </h1>
        <div className="d-flex flex-wrap justify-content-center gap-4">
          <Card style={{ width: '24rem', border: '2px solid red', borderRadius: '8px' }}>
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div>
                <Card.Title style={{ textAlign: 'center' }}>
                  {"PEPINO"}
                </Card.Title>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'red' }}>
                    Fecha de caducidad: {"En 1 dias"}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'red' }}>Queda: {"2 PZ"}</span>
                </div>
                <Card.Link href="#">
                  <img
                    src={provedor}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain',
                    }}
                  />
                </Card.Link>
              </div>
              <img
                src={logoAzul}
                alt="Material Referencial"
                style={{
                  marginLeft: '25px',
                  borderRadius: '8px',
                  width: '70px',
                  height: '70px',
                  objectFit: 'contain',
                }}
              />
            </Card.Body>
          </Card>
          {data.map((item, index) => (
            <Card key={index} style={{ width: '24rem', borderRadius: '8px' }}>
              <Card.Body
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <div>
                  <Card.Title style={{ textAlign: 'center' }}>
                    {item.nombre}
                  </Card.Title>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <span style={{ color: 'black' }}>
                      Fecha de caducidad: {item.fecha}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <span style={{ color: 'black' }}>Queda: {item.cantidad}</span>
                  </div>
                  <Card.Link href="#">
                    <img
                      src={provedor}
                      alt={item.proveedor}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain',
                      }}
                    />
                  </Card.Link>
                </div>
                <img
                  src={logoAzul}
                  alt="Material Referencial"
                  style={{
                    marginLeft: '25px',
                    borderRadius: '8px',
                    width: '70px',
                    height: '70px',
                    objectFit: 'contain',
                  }}
                />
              </Card.Body>
            </Card>
          ))}
          {/* CARDS DE PRUEBA */}

          <Card style={{ width: '24rem', border: '2px solid red', borderRadius: '8px' }}>

            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div>
                <Card.Title style={{ textAlign: 'center' }}>
                  {"CHOCOLATE"}
                </Card.Title>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'red' }}>
                    Fecha de caducidad: {"En 2 dias"}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'black' }}>Queda: {"30 KG"}</span>
                </div>
                <Card.Link href="#">
                  <img
                    src={provedor}

                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain',
                    }}
                  />
                </Card.Link>
              </div>
              <img
                src={logoAzul}
                alt="Material Referencial"
                style={{
                  marginLeft: '25px',
                  borderRadius: '8px',
                  width: '70px',
                  height: '70px',
                  objectFit: 'contain',
                }}
              />
            </Card.Body>
          </Card>

          {/* SEGUNDO CARD DE PRUEBA  */}

          <Card style={{ width: '24rem', border: '2px solid red', borderRadius: '8px' }}>
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div>
                <Card.Title style={{ textAlign: 'center' }}>
                  {"Leche de almendra"}
                </Card.Title>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'black' }}>
                    Fecha de caducidad: {"En 2 semanas"}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'red' }}>Queda: {"1.5 LT"}</span>
                </div>
                <Card.Link href="#">
                  <img
                    src={provedor}

                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain',
                    }}
                  />
                </Card.Link>
              </div>
              <img
                src={logoAzul}
                alt="Material Referencial"
                style={{
                  marginLeft: '25px',
                  borderRadius: '8px',
                  width: '70px',
                  height: '70px',
                  objectFit: 'contain',
                }}
              />
            </Card.Body>
          </Card>

          {/* tercer card de prueba */}

          <Card style={{ width: '24rem', border: '2px solid red', borderRadius: '8px' }}>
            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div>
                <Card.Title style={{ textAlign: 'center' }}>
                  {"PEPINO"}
                </Card.Title>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'red' }}>
                    Fecha de caducidad: {"En 1 dias"}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'red' }}>Queda: {"2 PZ."}</span>
                </div>
                <Card.Link href="#">
                  <img
                    src={provedor}

                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain',
                    }}
                  />
                </Card.Link>
              </div>
              <img
                src={logoAzul}
                alt="Material Referencial"
                style={{
                  marginLeft: '25px',
                  borderRadius: '8px',
                  width: '70px',
                  height: '70px',
                  objectFit: 'contain',
                }}
              />
            </Card.Body>
          </Card>

          {/* CUARTO card de prueba */}


          <Card style={{ width: '24rem', borderRadius: '8px' }}>

            <Card.Body
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <div>
                <Card.Title style={{ textAlign: 'center' }}>
                  {"Maisena"}
                </Card.Title>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'black' }}>
                    Fecha de caducidad: {"En 2 dias"}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <span style={{ color: 'black' }}>Queda: {"30 KG"}</span>
                </div>
                <Card.Link href="#">
                  <img
                    src={provedor}

                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain',
                    }}
                  />
                </Card.Link>
              </div>
              <img
                src={logoAzul}
                alt="Material Referencial"
                style={{
                  marginLeft: '25px',
                  borderRadius: '8px',
                  width: '70px',
                  height: '70px',
                  objectFit: 'contain',
                }}
              />
            </Card.Body>
          </Card>

        </div>
      </div>
    </div>
  );
}


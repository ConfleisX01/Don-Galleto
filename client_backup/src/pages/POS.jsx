import { FaCookieBite, FaBalanceScale, FaDollarSign, FaTrashAlt, FaCartPlus } from "react-icons/fa";
import { BsCartXFill } from "react-icons/bs";
import { BiPackage } from "react-icons/bi";
import { GiArchiveRegister } from "react-icons/gi";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Pos() {
    const [total, setTotal] = useState(0)
    const [isModalOpenSales, setIsModalOpenSales] = useState(false);
    const [isModalOpenGramos, setIsModalOpenGramos] = useState(false);
    const [isModalOpenDinero, setIsModalOpenDinero] = useState(false);
    const [isModalOpenUnidad, setIsModalOpenUnidad] = useState(false);
    const [isModalOpenPaquetes, setIsModalOpenPaquetes] = useState(false);
    const [cookies, setCookies] = useState([]);
    const [sales, setSales] = useState([]);
    const [selectedCookie, setSelectedCookie] = useState(null);
    const [cart, setCart] = useState([]);
    let i = 0;
    const addToCart = (cookieData) => {
        setCart(prevCart => [...prevCart, cookieData]);
    };

    useEffect(() => {
        sumarCantidad()
    }, [cart])

    const showModalSaleGramos = async () => {
        await getAllCookies();
        setIsModalOpenGramos(!isModalOpenGramos);
    }
    const showModalSales = async () => {
        await getAllSales();
        setIsModalOpenSales(!isModalOpenSales);
    }
    const showModalSaleDinero = async () => {
        await getAllCookies();
        setIsModalOpenDinero(!isModalOpenDinero);
    }
    const showModalSaleUnidad = async () => {
        await getAllCookies();
        setIsModalOpenUnidad(!isModalOpenUnidad);
    }
    const showModalSalePaquetes = async () => {
        await getAllCookies();
        setIsModalOpenPaquetes(!isModalOpenPaquetes);
    }
    const handleCookieSelection = (cookie) => {
        setSelectedCookie(cookie);
    }
    const removeFromCart = (cookieId) => {
        setCart(prevCart => prevCart.filter(item => item.cookieId !== cookieId));
    };
    const deleteCart = () => {
        setCart([]);
    };

    const sumarCantidad = () => {
        let newTotal = 0;
        cart.forEach(item => {
            if (item.type === "g") {
                newTotal += item.cookiePrice * (item.cantidad / 37);
            } else if (item.type === "d") {
                newTotal += parseFloat(item.cantidad);
            } else if (item.type === "p") {
                newTotal += item.cantidad * (1000 / 37);
            } else if (item.type === "u") {
                newTotal += parseInt(item.cantidad * item.cookiePrice);
            }
        });
        setTotal(newTotal);
    };

    const getAllCookies = async () => {
        try {
            const response = await axios.get('http://localhost:4001/pos/getAllCookies');
            setCookies(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllSales = async () => {
        try {
            const response = await axios.get('http://localhost:4001/pos/getAllSales');
            setSales(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const doSale = () => {
        axios.post('http://localhost:4001/pos/insertSale', {
            cart
        }).then(function (response) {
            if (response.status === 200) {
                toast.success('Venta realizada exitosamente!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setCart([]);
            } else {

            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <>
            <div className="border grid md:grid-cols-2 lg:grid-cols-2 rounded px-2 lg:h-full">
                <div className="grid grid-cols-2 gap-2 border-b py-2 md:grid-cols-1 lg:grid-cols-2">
                    <ContainerBtn
                        icon={<FaCookieBite />}
                        text={"Unitaria"}
                        onClick={showModalSaleUnidad}
                    />
                    <ContainerBtn
                        icon={<FaBalanceScale />}
                        text={"Gramos"}
                        onClick={showModalSaleGramos}
                    />
                    <ContainerBtn
                        icon={<BiPackage />}
                        text={"Paquete"}
                        onClick={showModalSalePaquetes}
                    />
                    <ContainerBtn
                        icon={<FaDollarSign />}
                        text={"Dinero"}
                        onClick={showModalSaleDinero}
                    />
                </div>
                <div className="p-4 h-full">
                    <div className="border rounded-xl flex flex-col">
                        <div className="grow">
                            <div className="mb-8 overflow-y-auto" style={{ height: "75vh" }}>
                                {cart.map((cookie, index) => (
                                    <CardCookie
                                        key={index}
                                        typeCookie={cookie.cookieName}
                                        cantidadCookie={cookie.cantidad}
                                        priceTotal={cookie.type === "g" ? "g" : cookie.type === "p" ? "Paq" : cookie.type === "d" ? "$" : cookie.type === "u" ? "pzas" : ""}
                                        onRemove={() => removeFromCart(cookie.cookieId)}
                                    />
                                ))}

                            </div>

                        </div>
                        <div className="flex border-t">
                            <div className="p-2 flex-1 border-r items-center flex flex-col">
                                <p>Eliminar carrito</p>
                                <div className="flex aling-center items-center btn btn-error my-3" onClick={deleteCart}>
                                    <BsCartXFill />
                                    <p>Eliminar</p>
                                </div>
                            </div>
                            <div className="p-2 flex-1 border-r items-center flex flex-col">
                                <p>Total:
                                    {total}
                                </p>
                                <div className="flex aling-center items-center btn btn-primary my-3" onClick={doSale}>
                                    <FaCartPlus />
                                    <p>Registrar</p>
                                </div>
                            </div>
                            <div className="p-2 flex-1 items-center flex flex-col">
                                <p>Ver Ventas</p>
                                <div className="flex aling-center items-center btn btn-primary my-3" onClick={showModalSales}>
                                    <GiArchiveRegister />
                                    <p>Mostrar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isModalOpenGramos && <ModalSale type={"g"} cookies={cookies} onClick={showModalSaleGramos} onCookieSelect={handleCookieSelection} addToCart={addToCart} />}
                {isModalOpenDinero && <ModalSale type={"d"} cookies={cookies} onClick={showModalSaleDinero} onCookieSelect={handleCookieSelection} addToCart={addToCart} />}
                {isModalOpenUnidad && <ModalSale type={"u"} cookies={cookies} onClick={showModalSaleUnidad} onCookieSelect={handleCookieSelection} addToCart={addToCart} />}
                {isModalOpenPaquetes && <ModalSale type={"p"} cookies={cookies} onClick={showModalSalePaquetes} onCookieSelect={handleCookieSelection} addToCart={addToCart} />}
                {isModalOpenSales && <ModalSales sales={sales} onClick={showModalSales} />}
            </div>
        </>
    );
}

function ModalSale({ type, cookies, onClick, onCookieSelect, addToCart }) {
    const [selectedCookieId, setSelectedCookieId] = useState(null);
    const [cantidad, setCantidad] = useState('');


    const handleSelectCookie = (id) => {
        setSelectedCookieId(id);
        const selectedCookie = cookies.find(cookie => cookie.id_galleta === id);
        onCookieSelect(selectedCookie);
    };

    const handleRegister = () => {
        const cookie = cookies.find(cookie => cookie.id_galleta === selectedCookieId);
        const data = {
            cookieId: selectedCookieId,
            cantidad: cantidad,
            cookieName: cookie?.nombre_galleta,
            cookiePrice: cookie?.precio,
            type: type,
        };
        addToCart(data);
        onClick();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white border grid rounded-lg p-8 shadow-lg w-2/3 text-center sm:flex h-3/4 lg:w-2/4">
                <div className="grow">
                    <div className="mb-8 overflow-y-auto h-2/3">
                        {cookies.map((cookie) => (
                            <CardCookie2
                                key={cookie.id_galleta}
                                id={cookie.id_galleta}
                                nameCookie={cookie.nombre_galleta}
                                priceCookie={cookie.precio}
                                selectedCookie={selectedCookieId === cookie.id_galleta}
                                onSelect={handleSelectCookie}
                            />
                        ))}
                    </div>
                    {type === "p" ? (
                        <div>
                            <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">Cantidad</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                                        <select id="currency" name="currency" aria-label="Currency" className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pl-3 pr-7 text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                            <option>1 kg</option>
                                            <option>1/2 kg</option>
                                        </select>
                                        <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        name="cantidad"
                                        id="cantidad"
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        placeholder="0"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : type === "d" ? (
                        <div>
                            <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">Cantidad</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6 mr-2">$</div>
                                    <input
                                        type="text"
                                        name="cantidad"
                                        id="cantidad"
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        placeholder="0.00"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : type === "g" ? (
                        <div>
                            <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">Cantidad</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6 mr-2">Gramos</div>
                                    <input
                                        type="text"
                                        name="cantidad"
                                        id="cantidad"
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        placeholder="0.00"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                    />

                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="price" className="block text-sm/6 font-medium text-gray-900">Cantidad</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6 mr-2">Unidades</div>
                                    <input
                                        type="text"
                                        name="cantidad"
                                        id="cantidad"
                                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        placeholder="0"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center">
                    <div className="p-2 items-center h-fit">
                        <div className="flex aling-center items-center btn btn-error my-3" onClick={onClick}>
                            <BsCartXFill />
                            <button>Cancelar</button>
                        </div>
                    </div>
                    <div className="p-2 items-center h-fit">
                        <div className="flex aling-center items-center btn btn-primary my-3" onClick={handleRegister}>
                            <FaCartPlus />
                            <button>Registrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ModalSales({ sales, onClick }) {
    const [sales2, setSales2] = useState([]);
    const [isModalOpenCookies, setIsModalOpenCookies] = useState(false);
    const showModalCookies = () => {
        setIsModalOpenCookies(!isModalOpenCookies);
    }
    const showDetails = (idVenta) => {
        getAllSales(idVenta);
        console.log(sales2);
        showModalCookies();
    };
    const getAllSales = async (idVenta) => {
        try {
            axios.post('http://localhost:4001/pos/getAllSalesDetails', {
                idVenta
            }).then(function (response) {
                setSales2(response.data);
            }).catch(function (error) {
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex-col bg-white border grid rounded-lg p-8 shadow-lg w-2/3 text-center sm:flex h-3/4 lg:w-2/4">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Fecha</th>
                            <th>estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sales.map((sale, index) => {
                                return (
                                    <tr key={index} className="cursor-pointer hover:bg-indigo-50" onClick={() => showDetails(sale.id_venta)}>
                                        <td>{sale.id_venta}</td>
                                        <td>{sale.fecha_venta}</td>
                                        <td>{sale.estatus_venta === 1 ? "Activa" : "Inactiva"}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <div className="flex aling-center items-center btn btn-primary my-3" onClick={onClick}>
                    <BsCartXFill />
                    <button>Cerrar</button>
                </div>
                {isModalOpenCookies && <ModalCookies cookies={sales2} onClick={showModalCookies} />}
            </div>
        </div>
    );
}

function ModalCookies({ cookies, onClick }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex-col bg-white border grid rounded-lg p-8 shadow-lg w-2/3 text-center sm:flex h-3/4 lg:w-2/4">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>Galleta</th>
                            <th>Cantidad</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cookies.map((cookie, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{cookie.nombre_galleta}</td>
                                        <td>{cookie.cantidad}</td>
                                        <td>{cookie.tipo_cantidad === "g" ? "Gramos" : cookie.tipo_cantidad === "u" ? "Unidad" : cookie.tipo_cantidad === "p" ? "Paquete" : "Dinero"}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
                <div className="flex aling-center items-center btn btn-primary my-3" onClick={onClick}>
                    <BsCartXFill />
                    <button>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

function ContainerBtn({ icon, text, onClick }) {
    return (
        <>
            <div className="p-4 border shadow text-center w-auto content-center hover:bg-indigo-50 cursor-pointer"
                onClick={onClick}>
                <div className="text-6xl md:text-8xl lg:text9xl flex justify-center">
                    {
                        icon
                    }
                </div>
                <div>
                    <p className="font-medium text-indigo-800">{text}</p>
                </div>
            </div>
        </>
    )
}

function CardCookie({ typeCookie, cantidadCookie, priceTotal, onRemove }) {
    return (
        <div className="p-2 mx-2 my-3 border rounded-xl flex shadow text-center justify-center w-auto">
            <div className="text-1xl flex justify-center border-r px-2 content-center lg:text-xl">
                <p>{typeCookie}</p>
            </div>
            <div className="px-2 border-r content-center">
                <p>{cantidadCookie}</p>
            </div>
            <div className="px-2 border-r content-center">
                <p>{priceTotal}</p>
            </div>
            <div className="px-2 content-center cursor-pointer hover:bg-indigo-50 hover:rounded-md" onClick={onRemove}>
                <FaTrashAlt />
            </div>
        </div>
    );
}



function CardCookie2({ nameCookie, priceCookie, id, selectedCookie, onSelect }) {
    return (
        <div
            className={`p-2 mx-2 my-3 border rounded-xl flex shadow text-center justify-center w-auto cursor-pointer ${selectedCookie ? "bg-indigo-100" : ""
                }`}
            onClick={() => onSelect(id)}
        >
            <input
                type="radio"
                id={`cookie-${id}`}
                name="cookie"
                value={id}
                checked={selectedCookie}
                onChange={() => { }}
                className="hidden"
            />
            <div className="text-1xl flex justify-center border-r px-2 content-center lg:text-xl">
                <p>{nameCookie}</p>
            </div>
            <div className="px-2 content-center">
                <p>${priceCookie}</p>
            </div>
        </div>
    );
}
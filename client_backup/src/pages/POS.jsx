import { FaCookieBite, FaBalanceScale, FaDollarSign, FaTrashAlt } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";


export default function Pos() {
    return (
        <>
            <div className="border grid md:grid-cols-2 lg:grid-cols-2 rounded px-2 lg:h-full">
                <div className="grid grid-cols-2 gap-2 border-b py-2 md:grid-cols-1 lg:grid-cols-2">
                    <ContainerBtn
                        icon={<FaCookieBite />}
                        text={"Unitaria"}
                    />
                    <ContainerBtn
                        icon={<FaBalanceScale />}
                        text={"Gramos"}
                    />
                    <ContainerBtn
                        icon={<BiPackage />}
                        text={"Paquete"}
                    />
                    <ContainerBtn
                        icon={<FaDollarSign />}
                        text={"Dinero"}
                    />
                </div>
                <div className="p-4 h-100">
                    <div className="border rounded-xl flex flex-col">
                        <div className="grow">
                            <div className="h-full  overflow-y-auto">
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                                <CardCookie
                                    typeCookie={"Galleta de chocolate"}
                                    cantidadCookie={"15"}
                                    priceTotal={"$60"}
                                />
                            </div>

                        </div>
                        <div className="flex">
                            <div className="p-2 flex-1 border-r items-center flex flex-col">
                                <p>Eliminar carrito</p>
                                <button className="btn btn-error my-3">Eliminar</button>
                            </div>
                            <div className="p-2 flex-1 items-center flex flex-col">
                                <p>Total: $250.00</p>
                                <button className="btn btn-primary my-3">Registrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ContainerBtn({ icon, text }) {
    return (
        <>
            <div className="p-4 border shadow text-center w-auto content-center">
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

function CardCookie({ typeCookie, cantidadCookie, priceTotal }) {
    return (
        <>
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
                <div className="px-2 content-center">
                    <FaTrashAlt />
                </div>
            </div>
        </>
    )
}
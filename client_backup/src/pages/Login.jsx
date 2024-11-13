export default function Login() {

    const toDashboard = () => {
        window.location = '/system'
    }

    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center p-1">
                <div className="w-full sm:w-2/3 lg:w-1/4 border shadow flex flex-col justify-center p-8 gap-y-5 rounded-md">
                    <div className="text-center">
                        <h1 className="font-bold text-3xl">Don Galleto</h1>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="avatar">
                            <div className="w-24 rounded-full shadow-lg">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="font-semibold text-blue-600 mb-1 text-sm">Ingrese el pin para acceder</p>
                        <input type="password" className="input input-bordered w-full text-center text-2xl" placeholder="*****" />
                    </div>
                    <div>
                        <button className="btn btn-primary w-full" onClick={() => toDashboard()}>Ingresar</button>
                    </div>
                </div>
            </div>
        </>
    )
}
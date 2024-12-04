import { useState, useEffect } from 'react';
import { initProcedure, nextStepOrden, marcarMerma } from '../apiHandllerProduccion/APIProducion';
import { toast, ToastContainer } from 'react-toastify'

export default function CardProduction({ priority, numOrden, name, text, step, onUpdate }) {


    const [currentStep, setCurrentStep] = useState(step);

    useEffect(() => { }, [currentStep]);

    const handleNextStep = async () => {
        if (currentStep === 0) {
            const response = await initProcedure(numOrden);
            if (response.success) {
                toast.success(response.message);
                setCurrentStep(currentStep + 1);
                onUpdate?.();
                return;
            } else if (!response.success) {
                let mensaje = response.message || "";
                mensaje = mensaje.replace(/;/g, ';\n');
                toast.info(mensaje);
                return;
            }
        }
        if (currentStep < 4) {
            const response = await nextStepOrden(numOrden);
            if (response.success) {
                toast.success(response.message);
                setCurrentStep(currentStep + 1);
                onUpdate?.();
            } else {
                toast.error(response.message)
                return;
            }
        }
    };

    const handleMarcarMerma = async () => {
        const data = {
            numOrden: numOrden,
            razon: step < 3 ? 'error durante la pruduccion' : 'error de durante el proceso de enfriamiento'
        }
        const response = await marcarMerma(data);
        if (response.success) {
            toast.success(response.message);
            onUpdate?.();
        } else {
            toast.error(response.message)
        }
    }

    // Determina el color según la prioridad
    const getColorClass = (priority) => {
        switch (priority) {
            case 1:
                return 'bg-red-600';
            case 2:
                return 'bg-yellow-300';
            case 3:
                return 'bg-green-500';
            default:
                return 'bg-gray-400';
        }
    };

    const getButtonText = (step) => {
        switch (step) {
            case 0:
                return 'Iniciar preparación';
            case 1:
                return 'Terminar preparación';
            case 2:
                return 'Enfriado completo';
            case 3:
                return 'Marcar como terminada';
            default:
                return 'Paso desconocido';
        }
    };


    return (
        <>


            <div className='m-6'>
                <div className="flex border border-gray-300 rounded-lg shadow">
                    {/* Div con color dinámico */}
                    <div className={`${getColorClass(priority)} border border-gray-300 rounded-bl-lg px-4 shadow`} ></div>

                    <div>
                        <h1 className='mx-6 mt-3 mb-2 text-lg font-medium'>No. Orden: {numOrden}</h1>
                        <h1 className='mx-6 mt-3 mb-2 text-lg font-medium'>{name}</h1>
                        <img
                            className="w-[250px] h-[250px] mx-6 mb-3 p-2 rounded-lg border border-gray-300 shadow object-cover"
                            src="https://es.cravingsjournal.com/wp-content/uploads/2023/06/galletas-de-chocolate-de-leche-y-caramelo-2.jpg"
                            alt="Galleta de nuez"
                        />
                    </div>

                    <div className='p-6 mx-6 w-[60%] items-center'>
                        <div className='pl-10'>
                            <ol className="flex items-center w-full mb-4 sm:mb-5">
                                {/* Paso 1 */}
                                <li
                                    className={`flex w-full items-center ${currentStep >= 1 ? 'text-green-400' : 'text-gray-300'
                                        } after:content-['Iniciado'] after:w-full after:h-1 after:border-b
                                ${currentStep >= 1 ? 'after:border-green-400' : 'after:border-gray-100'}
                                 after:border-4 after:inline-block ${currentStep >= 1 ? 'dark:after:border-green-400' : 'dark:after:border-gray-700'
                                        }`}
                                >
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 ${currentStep >= 1 ? 'bg-green-400' : 'bg-gray-100'
                                            } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
                                    >
                                        {currentStep >= 1 && (
                                            <svg
                                                className="w-6 h-6 text-gray-100 dark:text-green-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 16 12"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M1 5.917 5.724 10.5 15 1.5"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </li>
                                {/* Paso 2 */}
                                <li
                                    className={`flex w-full items-center ${currentStep >= 2 ? 'text-green-400' : 'text-gray-300'
                                        } after:content-['Procesado'] after:w-full after:h-1 after:border-b
                                    ${currentStep >= 2 ? 'after:border-green-400' : 'after:border-gray-100'} after:border-4 after:inline-block ${currentStep >= 2 ? 'dark:after:border-green-400' : 'dark:after:border-gray-700'
                                        }`}
                                >
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 ${currentStep >= 2 ? 'bg-green-400' : 'bg-gray-100'
                                            } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
                                    >
                                        {currentStep >= 2 && (
                                            <svg
                                                className="w-6 h-6 text-gray-100 dark:text-green-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 16 12"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M1 5.917 5.724 10.5 15 1.5"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </li>
                                {/* Paso 3 */}
                                <li
                                    className={`flex w-full items-center ${currentStep >= 3 ? 'text-green-400' : 'text-gray-300'
                                        } after:content-['Enfriando'] after:w-full after:h-1 after:border-b
                                    ${currentStep >= 3 ? 'after:border-green-400' : 'after:border-gray-100'} after:border-4 after:inline-block ${currentStep >= 3 ? 'dark:after:border-green-400' : 'dark:after:border-gray-700'
                                        }`}
                                >
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 ${currentStep >= 3 ? 'bg-green-400' : 'bg-gray-100'
                                            } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
                                    >
                                        {currentStep >= 3 && (
                                            <svg
                                                className="w-6 h-6 text-gray-100 dark:text-green-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 16 12"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M1 5.917 5.724 10.5 15 1.5"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </li>
                                {/* Paso 4 */}
                                <li
                                    className={`flex items-center w-full ${currentStep === 4 ? 'text-green-400' : 'text-gray-300'
                                        } after:content-['Terminado']`}
                                >
                                    <div
                                        className={`flex items-center justify-center w-10 h-10 ${currentStep === 4 ? 'bg-green-400' : 'bg-gray-100'
                                            } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
                                    >
                                        {currentStep === 4 && (
                                            <svg
                                                className="w-6 h-6 text-gray-100 dark:text-green-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 16 12"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="3"
                                                    d="M1 5.917 5.724 10.5 15 1.5"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                </li>
                            </ol>
                        </div>

                        <div className='p-3'>
                            <textarea
                                type="textarea"
                                className="h-[250px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
                                placeholder="Detalles de preparación"
                                disabled
                            >{text}</textarea>
                        </div>
                    </div>

                    <div className='block'>
                        {/* Botón para avanzar al siguiente paso */}
                        {currentStep <= 3 && (
                            <button
                                className="my-10 p-6 text-white font-medium bg-green-500 rounded-lg hover:bg-green-600 flex justify-center items-center"
                                onClick={handleNextStep}
                                disabled={currentStep === 4}
                            >
                                {getButtonText(currentStep)}
                                <svg
                                    className="px-2 item-center w-12 h-12 text-gray-200 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="gray-200"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </button>
                        )}


                        {/* Botón "Marcar como merma", visible solo en pasos 2 y 3 */}
                        {currentStep >= 1 && currentStep <= 3 && (
                            <button
                                className="p-6  text-white font-medium bg-red-500 rounded-lg hover:bg-red-600 flex justify-center items-center"
                                onClick={handleMarcarMerma}>
                                Marcar como merma
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

import {getAllMermas,putMerma,editMerma,deleteMerma } from '../DAO/DAOMermas.js';


export async function verifyMerma(data) {

    console.log(data)
    const forbiddenChars = /['";]|--/;

    if (typeof data.nombreInsumo !== 'string' || data.nombreInsumo.trim() === '') {
        return {
            success: false,
            message: 'El nombre debe ser una cadena de texto no vacia'
        }
    }

    if (typeof data.razon !== 'string' || data.razon.trim() === '') {
        return {
            success: false,
            message: 'El nombre debe ser una cadena de texto no vacia'
        }
    }

    if (typeof data.unidad !== 'string' || data.unidad.trim() === '') {
        return {
            success: false,
            message: 'La unidad debe ser una cadena de texto no vacia'
        }
    }

    if (!Number.isInteger(parseFloat(data.cantidad)) || data.cantidad <= 0) {
        console.log(data.cantidad)
        return {
            success: false,
            message: 'La cantidad debe ser un numero positivo'
        }
    }
    

    if (forbiddenChars.test(data.nombreInsumo) || forbiddenChars.test(data.razon) || forbiddenChars.test(data.unidad)) {
        return {
            success: false,
            message: "Se ingresaron caracteres prohibidos."
        }
    }

    const formattedData = {
        nombre_insumo: data.nombreInsumo,
        cantidad: data.cantidad + " " + data.unidad,
        razon_merma: data.razon
    };

    try {
        const result = await putMerma(formattedData);
        if(result.success){
            return result
        }
    } catch (error) {
        console.log(error);
        return{
            succes: false,
            message: 'error en el DAOMermas'
        }
    }
}

export async function verifyMermaEdit(data) {
    const forbiddenChars = /['";]|--/;

    if (typeof data.data.nombreInsumo !== 'string' || data.data.nombreInsumo.trim() === '') {
        return {
            success: false,
            message: 'El nombre debe ser una cadena de texto no vacia'
        }
    }

    if (typeof data.data.razon !== 'string' || data.data.razon.trim() === '') {
        return {
            success: false,
            message: 'El nombre debe ser una cadena de texto no vacia'
        }
    }

    if (typeof data.data.unidad !== 'string' || data.data.unidad.trim() === '') {
        return {
            success: false,
            message: 'La unidad debe ser una cadena de texto no vacia'
        }
    }

    if (typeof data.data.cantidad !== 'number' || data.data.cantidad <= 0) {
        return {
            success: false,
            message: 'La cantidad debe ser un numero positivo'
        }
    }

    if (typeof data.data.idMerma !== 'number' || data.data.idMerma <= 0) {
        return {
            success: false,
            message: 'el ID de la merma debe ser un numero positivo'
        }
    }

    if (forbiddenChars.test(data.data.nombreInsumo) || forbiddenChars.test(data.data.razon) || forbiddenChars.test(data.data.unidad)) {
        return {
            success: false,
            message: "Se ingresaron caracteres prohibidos."
        }
    }

    const formattedData = {
        idMerma: data.data.idMerma,
        nombre_insumo: data.data.nombreInsumo,
        cantidad: data.data.cantidad + " " + data.data.unidad,
        razon_merma: data.data.razon
    };

    try {
        const result = await editMerma(formattedData);
        if(result.success){
            return result
        }
    } catch (error) {
        console.log(error);
        return{
            succes: false,
            message: 'error en el DAOMermas'
        }
    }
}

export async function verifyMermaDelete(data) {

    if (typeof data.data.idMerma !== 'number' || data.data.idMerma <= 0) {
        return {
            success: false,
            message: 'el ID de la merma debe ser un numero positivo'
        }
    }

    try {
        const result = await deleteMerma(data);
        if(result.success){
            return result
        }
    } catch (error) {
        console.log(error);
        return{
            succes: false,
            message: 'error en el DAOMermas'
        }
    }
}
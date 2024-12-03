import { insertCookiesSale } from "./daoPos.js";

export async function validarInsertCookiesSale(idGalleta, idVenta, cantidad, tipo){
    const response = {
        estatus: true,
        mensaje: ""
    }
    if (idGalleta === null || idGalleta === "" || idGalleta === 0) {
        response.estatus = false;
        response.mensaje = "El id de la galleta no es correcto";
    } else if (cantidad === null || cantidad === "" || cantidad === 0) {
        response.estatus = false;
        response.mensaje = "El campo cantidad esta vacio";
    } else if (tipo === null || tipo === "" || tipo === 0) {
        response.estatus = false;
        response.mensaje = "El campo tipo esta vacio";
    }
    if (response.estatus === true) {
        try {
            await insertCookiesSale(idGalleta, idVenta, cantidad, tipo);
            return response.mensaje = 'Galleta agregada exitosamente a la venta'
        } catch (error) {
            console.error(error);
            return response.mensaje;
        }
    } else {
        return response.mensaje
    }
}
export async function toPublic(lista) {

    return lista.map((insumo)=>({
        idProducto: insumo.id_insumo,
        nombreProducto: insumo.nombre_insumo,
        cantidadProducto: insumo.cantidad,
        caducidadProducto: insumo.caducidad,
        unidadProducto: insumo.unidad

    }));
}
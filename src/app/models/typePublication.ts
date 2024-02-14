export class TypePublication {
    id: number;
	nombre: string;
    nombreCompleto: string;
    accesos: string;

    constructor(
        id: number = 0,
        nombre: string = '',
        nombreCompleto: string = '',
        accesos: string = '',
    ) {
        this.id = id;
        this.nombre = nombre;
        this.nombreCompleto = nombreCompleto;
        this.accesos = accesos;
    }
}
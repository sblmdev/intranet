export class TypePublication {
    id: number;
	nombre: string;
    accesos: string;

    constructor(
        id: number = 0,
        nombre: string = '',
        accesos: string = '',
    ) {
        this.id = id;
        this.nombre = nombre;
        this.accesos = accesos;
    }
}
export class Document {
    id: number;
	idPublicacion: number;
    urlDocumento: string;

    constructor(
        id: number = 0,
        idPublicacion: number = 0,
        urlDocumento: string = ''
    ) {
        this.id = id;
        this.idPublicacion = idPublicacion;
        this.urlDocumento = urlDocumento;
    }
}
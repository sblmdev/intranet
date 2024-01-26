export class DocumentRecomendation {
    id: number;
	idRecomendacion: number;
    urlDocumento: string;
    nombreDocumento: string;
    fechaDocumento: string;

    constructor(
        id: number = 0,
        idRecomendacion: number = 0,
        urlDocumento: string = '',
        nombreDocumento: string = '',
        fechaDocumento: string = ''
    ) {
        this.id = id;
        this.idRecomendacion = idRecomendacion;
        this.urlDocumento = urlDocumento;
        this.nombreDocumento = nombreDocumento;
        this.fechaDocumento = fechaDocumento;
    }
}
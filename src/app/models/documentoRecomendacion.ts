export class DocumentRecomendation {
    id: number;
	numero: number;
    urlDocumento: string;
    nombreDocumento: string;
    fechaDocumento: string;

    constructor(
        id: number = 0,
        numero: number = 0,
        urlDocumento: string = '',
        nombreDocumento: string = '',
        fechaDocumento: string = ''
    ) {
        this.id = id;
        this.numero = numero;
        this.urlDocumento = urlDocumento;
        this.nombreDocumento = nombreDocumento;
        this.fechaDocumento = fechaDocumento;
    }
}
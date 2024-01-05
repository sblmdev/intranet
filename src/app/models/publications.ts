export class Publication {
    id: number;
	gerencia: string;
    tipoPublicacion: string;
    titulo: string;
    contenido: string;
    fechaPublicacion: string;
    fechaEvento: string;
    urlDocumento: string;

    constructor(
        id: number = 0,
        gerencia: string = '',
        tipoPublicacion: string = '',
        titulo: string = '',
        contenido: string = '',
        fechaPublicacion: string = '',
        fechaEvento: string = '',
        urlDocumento: string = ''
    ) {
        this.id = id;
        this.gerencia = gerencia;
        this.tipoPublicacion = tipoPublicacion;
        this.titulo = titulo;
        this.contenido = contenido;
        this.fechaPublicacion = fechaPublicacion;
        this.fechaEvento = fechaEvento;
        this.urlDocumento = urlDocumento;
    }
}
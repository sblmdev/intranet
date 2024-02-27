export class Suggestion {
    id: number;
    usuario: string;
    gerencia: string;
    contenido: string;
    fecha: string;
  
    constructor(
      id: number = 0,
      usuario: string = '',
      gerencia: string = '',
      contenido: string = '',
      fecha: string = '',
    ) {
      this.id = id;
      this.usuario = usuario;
      this.gerencia = gerencia;
      this.contenido = contenido;
      this.fecha = fecha;
    }
}  
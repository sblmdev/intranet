export class Plan {
    id: number;
    nombre: string;
    entidad: string;
    informe: string;
    fechaInforme: string;
    tipoAuditoria: string;
    entidadAuditora: string;
    titularEntidadAuditora: string;
  
    constructor(
      id: number = 0,
      nombre: string = '',
      entidad: string = '',
      informe: string = '',
      fechaInforme: string = '',
      tipoAuditoria: string = '',
      entidadAuditora: string = '',
      titularEntidadAuditora: string = ''
    ) {
      this.id = id;
      this.nombre = nombre;
      this.entidad = entidad;
      this.informe = informe;
      this.fechaInforme = fechaInforme;
      this.tipoAuditoria = tipoAuditoria;
      this.entidadAuditora = entidadAuditora;
      this.titularEntidadAuditora = titularEntidadAuditora;
    }
}  
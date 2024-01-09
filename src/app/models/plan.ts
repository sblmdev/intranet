export class Plan {
    id: number;
    entidad: string;
    informe: string;
    fechaInforme: string;
    tipoAuditoria: string;
    entidadAuditora: string;
  
    constructor(
      id: number,
      entidad: string,
      informe: string,
      fechaInforme: string,
      tipoAuditoria: string,
      entidadAuditora: string
    ) {
      this.id = id;
      this.entidad = entidad;
      this.informe = informe;
      this.fechaInforme = fechaInforme;
      this.tipoAuditoria = tipoAuditoria;
      this.entidadAuditora = entidadAuditora;
    }
}  
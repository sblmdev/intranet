export class Recomendation {
    id: number;
    idPlan: number;
    numero: number;
    observacion: string;
    nivelRiesgo: number;
    recomendacion: string;
    acciones: string;
    medio: string;
    fechaFinal: string;
    unidadResponsable: string;
    documentoUnidadResponsable: string;
    dniResponsable: string;
    nombresResponsable: string;
    observacionRiesgos: string;
  
    constructor(
      id: number,
      idPlan: number,
      numero: number,
      observacion: string,
      nivelRiesgo: number,
      recomendacion: string,
      acciones: string,
      medio: string,
      fechaFinal: string,
      unidadResponsable: string,
      documentoUnidadResponsable: string,
      dniResponsable: string,
      nombresResponsable: string,
      observacionRiesgos: string
    ) {
      this.id = id;
      this.idPlan = idPlan;
      this.numero = numero;
      this.observacion = observacion;
      this.nivelRiesgo = nivelRiesgo;
      this.recomendacion = recomendacion;
      this.acciones = acciones;
      this.medio = medio;
      this.fechaFinal = fechaFinal;
      this.unidadResponsable = unidadResponsable;
      this.documentoUnidadResponsable = documentoUnidadResponsable;
      this.dniResponsable = dniResponsable;
      this.nombresResponsable = nombresResponsable;
      this.observacionRiesgos = observacionRiesgos;
    }
  }
  
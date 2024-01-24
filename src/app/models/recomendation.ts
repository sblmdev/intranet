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
    usuarioCreacion: number;
    usuarioModificacion: number;
    fechaCreación: string;
    fechaModificacion: string;

    estado: boolean;
  
    constructor(
      id: number = 0,
      idPlan: number = 0,
      numero: number = 0,
      observacion: string = '',
      nivelRiesgo: number = 0,
      recomendacion: string = '',
      acciones: string = '',
      medio: string = '',
      fechaFinal: string = '',
      unidadResponsable: string = '',
      documentoUnidadResponsable: string = '',
      dniResponsable: string = '',
      nombresResponsable: string = '',
      observacionRiesgos: string = '',
      usuarioCreacion: number = 0,
      usuarioModificacion: number = 0,
      fechaCreación: string = '',
      fechaModificacion: string = '',
      estado: boolean = true,
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
      this.usuarioCreacion = usuarioCreacion,
      this.usuarioModificacion = usuarioModificacion,
      this.fechaCreación = fechaCreación,
      this.fechaModificacion= fechaModificacion,
      this.estado = estado;
    }
  }
  
export class Unidad {
    id: number;
    nomUnidad: string;
    abrUnidad: string;
    abrUnidadPrincipal: string;
    estUnidad: boolean;
    depUnidad: boolean;
  
    constructor(
      id: number = 0,
      nomUnidad: string = '',
      abrUnidad: string = '',
      abrUnidadPrincipal: string = '',
      estUnidad: boolean = true,
      depUnidad: boolean = true,
    ) {
      this.id = id;
      this.nomUnidad = nomUnidad;
      this.abrUnidad = abrUnidad;
      this.abrUnidadPrincipal = abrUnidadPrincipal;
      this.estUnidad = estUnidad;
      this.depUnidad = depUnidad;
    }
  
  }
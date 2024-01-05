export class Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  usuario: string;
  contrasena: string;
  tipo: number;
  dependencia: string;
  dependenciaHijo: string;
  sede: string;

  constructor(
    id: number = 0,
    nombres: string = '',
    apellidos: string = '',
    dni: string = '',
    usuario: string = '',
    contrasena: string = '',
    tipo: number = 0,
    dependencia: string = '',
    dependenciaHijo: string = '',
    sede: string = '',
  ) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.dni = dni;
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.tipo = tipo;
    this.dependencia = dependencia;
    this.dependenciaHijo = dependenciaHijo;
    this.sede = sede;
  }

}
export class Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  usuario: string;
  contrasena: string;
  tipo: number; //1 ADMIN, 2 ALTA DIRECCIÓN Y/O GERENTES, 3 SUG GERENTES, 4 JEFES Y/O COORDINADORES, 5 PUEBLO EN GENERAL
  accesos: string; //1 PUBLICACIONES, 2 CEMENTERIOS, 3 PLANES DE ACCION
  dependencia: string;
  dependenciaHijo: string;
  correo: string;
  sede: string;
  estado: boolean;

  constructor(
    id: number = 0,
    nombres: string = '',
    apellidos: string = '',
    dni: string = '',
    usuario: string = '',
    contrasena: string = '',
    tipo: number = 0,
    accesos: string = '',
    dependencia: string = '',
    dependenciaHijo: string = '',
    correo: string = '',
    sede: string = '',
    estado: boolean = true,
  ) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.dni = dni;
    this.usuario = usuario;
    this.contrasena = contrasena;
    this.tipo = tipo;
    this.accesos = accesos;
    this.dependencia = dependencia;
    this.dependenciaHijo = dependenciaHijo;
    this.correo =  correo;
    this.sede = sede;
    this.estado = estado;
  }

}
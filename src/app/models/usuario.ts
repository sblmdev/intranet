export class Usuario {
  id: number;
  nombres: string;
  apellidos: string;
  dni: string;
  usuario: string;
  contrasena: string;
  tipo: number; //1 ADMIN, 2 PUBLICACIONES, 3 CEMENTERIO, 4 PLANES, 5 PUEBLO, 6 GERENTES
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
    this.dependencia = dependencia;
    this.dependenciaHijo = dependenciaHijo;
    this.correo =  correo;
    this.sede = sede;
    this.estado = estado;
  }

}
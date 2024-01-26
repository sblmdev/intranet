import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  getUsuario() : Usuario {
    let usuario: Usuario = new Usuario();
    const usuarioString = localStorage.getItem("Usuario");
    if (usuarioString !== null) {
      try {
        usuario = JSON.parse(usuarioString);
      } catch (error) {
        console.error("Error al parsear el objeto Usuario:", error);
      }
    } else {
      console.warn("No se encontró la clave 'Usuario' en localStorage.");
    }
    return usuario;
  }

}
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Suggestion } from 'src/app/models/suggestion';
import { Unidad } from 'src/app/models/unidad';
import { Usuario } from 'src/app/models/usuario';
import { SuggestionService } from 'src/app/services/suggestion.service';
import { UnidadService } from 'src/app/services/unidad.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  nombres: string = '';
  dependencia: string = '';
  usuario: Usuario = new Usuario();
  sugerencia: Suggestion = new Suggestion();
  unidades: Unidad[] = [];

  flag: boolean = false;

  constructor(private router: Router, 
    private unidadService: UnidadService, 
    private suggestionService: SuggestionService,
    private toastr: ToastrService) {}

  ngOnInit(){
    const usuarioString = localStorage.getItem("Usuario");
    if (usuarioString !== null) {
      try {
        this.usuario = JSON.parse(usuarioString);
        if(this.usuario.dependenciaHijo == ''){
          this.usuario.dependenciaHijo = this.usuario.dependencia;
        }
        this.sugerencia.usuario = this.usuario.apellidos + " " + this.usuario.nombres;
        this.unidadService.obtenerTodosUnidades().subscribe({
          next: (data) => {
            this.unidades = data;
            let un= this.unidades.find(n => n.abrUnidad == this.usuario.dependenciaHijo);
            if(un != undefined){
              this.sugerencia.gerencia = un.nomUnidad;
            }
          },
          error: (e) => {
            console.log(e);
          }
        });
      } catch (error) {
        console.error("Error al parsear el objeto Usuario:", error);
      }
    } else {
      console.warn("No se encontró la clave 'Usuario' en localStorage.");
    }
  }

  goHome() {
    this.router.navigate(['/','news']);    
  }

  cerrarSesion() {
    this.router.navigate(['/']);

    setTimeout(() => {
      localStorage.setItem("Token", "");
      localStorage.setItem("Usuario", "");
      localStorage.setItem("DateTime", "0");
      window.location.reload();
    }, 1000);
  }

  openModal() {
    this.flag = true;
  }

  closeModal() {
    this.flag = false;
  }

  save() {
    this.sugerencia.fecha = new Date().toISOString().substring(0,10);
    this.suggestionService.crearSugerencia(this.sugerencia).subscribe({
      next: (data) => {
        this.flag = false;
        this.toastr.success('La Sugerencia se envío correctamente', 'Éxito');
        this.sugerencia = new Suggestion();
      },
      error: (e) => {
        this.toastr.success('Error al enviar la Sugerencia', 'Error');
        console.log(e);
      }
    });
  }
}

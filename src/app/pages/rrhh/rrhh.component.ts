import { Component } from '@angular/core';
import { Unidad } from 'src/app/models/unidad';
import { Usuario } from 'src/app/models/usuario';
import { UnidadService } from 'src/app/services/unidad.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-rrhh',
  templateUrl: './rrhh.component.html',
  styleUrls: ['./rrhh.component.css']
})
export class RrhhComponent {
  unidades: Unidad[] = [];
  padres: Unidad[] = [];
  hijos: Unidad[] = [];
  usuarios: Usuario[] = []

  unidadSelected: string = '';
  unidadHijoSelected: string = '';
  collaboratorsFlag: boolean = false;
  infoFlag: boolean = false;
  infoSelected: string = 'Personal';

  p:any;

  constructor(private unidadService: UnidadService, private usuarioService: UsuarioService) {

  }

  ngOnInit() {
    this.unidadService.obtenerTodosUnidades().subscribe({
      next: (data) => {
        this.unidades = JSON.parse(JSON.stringify(data));
        this.padres = JSON.parse(JSON.stringify(data.filter(u => u.depUnidad == true && u.abrUnidad!='GG')));
      },
      error: (_e) => {
        console.log(_e);
      }
    });
  }

  showSubUnidades(abrUnidad: string) {
    if(this.unidadSelected != abrUnidad){
      this.unidadSelected = abrUnidad;
    }
    else{
      this.unidadSelected = '';
    }
    
    this.hijos = JSON.parse(JSON.stringify(this.unidades.filter(u => u.abrUnidadPrincipal == abrUnidad)));
  }

  openCollaborators(abrUnidad: string) {
    this.unidadHijoSelected = abrUnidad;
    this.collaboratorsFlag = true;
    this.usuarioService.obtenerTodosUsuariosPorUnidadHijo(abrUnidad).subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log(this.usuarios);
      },
      error: (_e) => {
        console.log(_e);
      }
    });
  }

  closeCollaborators() {
    this.collaboratorsFlag = false;
  }

  openInfo(id: number) {
    this.collaboratorsFlag = false;
    this.infoFlag = true;
  }

  closeInfo() {
    this.infoFlag = false;
    this.collaboratorsFlag = true;
  }

  selectInfo(info: string) {
    this.infoSelected = info;
  }
}

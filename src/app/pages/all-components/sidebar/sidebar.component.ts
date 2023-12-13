import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  misionFlag: boolean = false;
  visionFlag: boolean = false;
  orgFlag: boolean = false;
  valoresFlag: boolean = false;
  constructor(private router: Router) {}

  fullscreen = false;
  toggleMision(): boolean{
    this.misionFlag=!this.misionFlag
  return this.misionFlag
  }
  toggleVision(): boolean{
    this.visionFlag=!this.visionFlag
  return this.visionFlag
  }

  toggleOrg(): boolean{
    this.orgFlag=!this.orgFlag
  return this.orgFlag
  
  }
  toggleValores(): boolean{
    this.valoresFlag=!this.valoresFlag
  return this.valoresFlag
  }

  abrirPublicaciones():void{
    this.router.navigate(['/publication']);
  }
}
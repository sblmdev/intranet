import { Component } from '@angular/core';

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
}
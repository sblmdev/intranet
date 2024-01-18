import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/loginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private toastr: ToastrService) {}

  ngOnInit(){
  }

  sendUsernamePassword() {
    /*let usuario = new Usuario(1,"Jeferson Santos", "Cayo Ortega", "45608935", "jcayo", "123456", 1, "GTI", "SGDS", "Jr. Puno 228");
    sessionStorage.setItem("Token", "tokenNew");
    sessionStorage.setItem("Usuario", JSON.stringify(usuario));
    this.toastr.success(usuario.usuario + ', bienvenido a la INTRANET', 'Ingreso correcto');
    window.location.reload();*/
    this.loginService.login(this.username, this.password).subscribe({
      next: (usuario: Usuario) => {
        sessionStorage.setItem("Token", "tokenNew");
        sessionStorage.setItem("Usuario", JSON.stringify(usuario));
        this.toastr.success(usuario.usuario + ', bienvenido a la INTRANET', 'Ingreso correcto');
        window.location.reload();
      },
      error:(e) => {
        this.toastr.error('El usuario y/o contraseña son incorrectos', 'Error');
        console.error("Error durante la autenticación:", JSON.stringify(e));
      }
    });
  }
}

import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';

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
    this.loginService.login(this.username, this.password).subscribe({
      next: (usuario: Usuario) => {
        let fecha = new Date();
        localStorage.setItem("Token", "tokenNew");
        localStorage.setItem("Usuario", JSON.stringify(usuario));
        localStorage.setItem("DateTime", JSON.stringify(fecha.getTime()));
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

import { Component } from '@angular/core';
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

  constructor(private loginService: LoginService) {}

  ngOnInit(){
  }

  sendUsernamePassword() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (usuario: Usuario) => {
        sessionStorage.setItem("Token", "tokenNew");
        sessionStorage.setItem("Usuario", JSON.stringify(usuario));
        window.location.reload();
      },
      error:(e) => {
        console.error("Error durante la autenticación:", JSON.stringify(e));
      }
    });
  }
}

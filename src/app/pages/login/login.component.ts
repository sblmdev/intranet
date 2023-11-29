import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/LoginService';

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

  sendUsernamePassword(){
    let validate = this.loginService.login(this.username, this.password);
    if(validate){
      sessionStorage.setItem("Token","tokenNew");
      window.location.reload();
    }
  }
}

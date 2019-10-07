import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailModel: string;
  passwordModel: string;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.emailModel = "";
    this.passwordModel = "";
  }

  ngOnInit() { }

  Logearse() {
    this.usuarioService.LoguearUsuario(this.emailModel, this.passwordModel);
  }
}

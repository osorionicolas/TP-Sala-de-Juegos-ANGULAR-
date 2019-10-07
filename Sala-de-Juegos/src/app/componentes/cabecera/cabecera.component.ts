import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  public estaLogeado: boolean;
  private nombre;
  private imageUrl;

  constructor(private usuarioService: UsuarioService, private dataApi: DataApiService) { }

  ngOnInit() {
    this.TraerUsuarioActual();
  }

  TraerUsuarioActual() {
    this.usuarioService.EstaLogeado().subscribe(user => {
      if (user) {
        this.dataApi.TraerUno(user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {
          this.usuarioService.usuario = userx;
          this.imageUrl = this.usuarioService.usuario.ImagenUrl;
          this.nombre = this.usuarioService.usuario.Nombre;
        });
        this.estaLogeado = true;
      }
      else {
        this.estaLogeado = false;
      }
    });

  }

  Deslogearse() {
    this.usuarioService.DeslogearUsuario();
  }
}

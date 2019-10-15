import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PuntuacionInterface } from 'src/app/clases/Puntuacion';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { DataApiService } from 'src/app/servicios/DataApi.service';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.scss']
})
export class AdivinaElNumeroComponent implements OnInit {

  @Output() enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAdivina;
  Mensajes: string;
  contador: number;
  ocultarVerificar: boolean;

  constructor(private usuarioServe: UsuarioService, private dataApi: DataApiService, private router: Router) {
    this.nuevoJuego = new JuegoAdivina();
    console.info("Número secreto:", this.nuevoJuego.numeroSecreto);
    this.ocultarVerificar = false;
  }

  ngOnInit() {
  }

  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.contador = 0;
  }

  verificar() {
    this.contador++;
    this.ocultarVerificar = true;

    console.info("Número secreto:", this.nuevoJuego.gano);

    if (this.nuevoJuego.verificar()) {

      this.enviarJuego.emit(this.nuevoJuego);
      this.MostarMensaje("Sos un Genio!!!", true);
      this.nuevoJuego.numeroSecreto = 0;

    } else {

      let mensaje: string;
      switch (this.contador) {
        case 1:
          mensaje = "Ese no es, intento fallido, metele pila";
          break;
        case 2:
          mensaje = "Tampoco, te estarás acercando???";
          break;
        case 3:
          mensaje = "No es, la tercera no es la vencida parece ser..";
          break;
        case 4:
          mensaje = "No era ese juntamente";
          break;
        case 5:
          mensaje = "Tantos intentos y todavía nada.";
          break;
        case 6:
          mensaje = "Afortunado en el amor";
          break;

        default:
          mensaje = "Ya le erraste " + this.contador + " veces";
          break;
      }
      this.MostarMensaje("#" + this.contador + " " + mensaje + "\nAYUDA: " + this.nuevoJuego.retornarAyuda());
    }

    console.info("numero Secreto: ", this.nuevoJuego.gano);
  }

  MostarMensaje(mensaje: string = "este es el mensaje", ganador: boolean = false) {
    this.Mensajes = mensaje;

    if (ganador) {
      Swal.fire({
        type: 'success',
        title: 'Ganaste!',
        timer: 1500
      })

      this.guardarResultados();
    }
    else {
      Swal.fire({
        position: 'top-end',
        type: 'info',
        title: mensaje,
        showConfirmButton: false,
        timer: 2500
      })
    }

    var modelo = this;
    setTimeout(function () {
      modelo.ocultarVerificar = false;
    }, 3000);
  }

  guardarResultados() {
    let img = "assets/imagenes/default-user.png";
    let nombre = "Anónimo";

    if (this.usuarioServe.usuario.Nombre != "") {
      img = this.usuarioServe.usuario.ImagenUrl;
      nombre = this.usuarioServe.usuario.Nombre;
    }

    let puntos: PuntuacionInterface = {
      ImagenUrl: img,
      Jugador: nombre,
      Juego: "Adivina el Número",
      Puntuacion: "Ganó en " + this.contador.toString() + " intento/s"
    }

    this.dataApi.AgregarUno(puntos, "puntuacion");
  }

  salir() {
    this.router.navigate(['/juegos']);
  }
}

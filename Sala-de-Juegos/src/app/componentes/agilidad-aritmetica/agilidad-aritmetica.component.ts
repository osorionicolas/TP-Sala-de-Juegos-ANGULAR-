import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'
import Swal from "sweetalert2";
import { Router } from '@angular/router';
// import { Subscription } from "rxjs";
// import {TimerObservable} from "rxjs/observable/TimerObservable";

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.scss']
})
export class AgilidadAritmeticaComponent implements OnInit {

  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;

  ngOnInit() {
  }

  ngOnDestroy() {
    clearInterval(this.repetidor);
  }

  constructor(private router: Router) {
    this.ocultarVerificar = true;
    this.Tiempo = 10;
    this.nuevoJuego = new JuegoAgilidad();
  }

  NuevoJuego() {
    this.nuevoJuego.randomValores();

    this.ocultarVerificar = false;
    // clearInterval(this.repetidor);
    this.repetidor = setInterval(() => {
      this.Tiempo--;

      if (this.Tiempo == 0) {
        // clearInterval(this.repetidor);
        this.Verificar();
        this.ocultarVerificar = true;
      }
    }, 900);

    window.setTimeout(function () {
      document.getElementById('inputNumero').focus();
      document.getElementById('inputNumero')["value"] = "";
    }, 0);
  }

  Verificar() {
    let result;
    clearInterval(this.repetidor);

    switch (this.nuevoJuego.operador) {
      case "+":
        result = this.nuevoJuego.primerNumero + this.nuevoJuego.segundoNumero;
        break;
      case "*":
        result = this.nuevoJuego.primerNumero * this.nuevoJuego.segundoNumero;
        break;
      // case "/":
      //   result = this.nuevoJuego.primerNumero / this.nuevoJuego.segundoNumero;
      //   break;
      case "-":
        result = this.nuevoJuego.primerNumero - this.nuevoJuego.segundoNumero;
        break;
    }

    if (result == this.nuevoJuego.numeroIngresado) {
      Swal.fire({
        title: 'Ganaste!',
        animation: false,
        type: 'success',
        customClass: {
          popup: 'animated tada'
        }
      }).then(() => {
        this.ocultarVerificar = true;
        this.Tiempo = 10;
      })
    }
    else {
      Swal.fire({
        title: 'Perdiste!',
        animation: false,
        type: 'error',
        customClass: {
          popup: 'animated tada'
        }
      }).then(() => {
        this.ocultarVerificar = true;
        this.Tiempo = 10;
      })
    }
  }

  salir() {
    this.router.navigate(['/juegos']);
  }
}

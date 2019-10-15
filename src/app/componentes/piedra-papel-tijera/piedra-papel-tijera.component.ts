import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { Router } from '@angular/router';
import { PuntuacionInterface } from 'src/app/clases/Puntuacion';
import { DataApiService } from 'src/app/servicios/DataApi.service';

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.scss']
})
export class PiedraPapelTijeraComponent implements OnInit {
  nombre: string;
  imagenUser: string;
  btnMensaje = "Salir";

  constructor(private uService: UsuarioService, private router: Router, private dataApi: DataApiService) { }

  ngOnInit() {
    this.nombre = "Anónimo";
    this.imagenUser = "assets/imagenes/default-user.png";

    if (this.uService.usuario.Nombre != "") {
      this.nombre = this.uService.usuario.Nombre;
      this.imagenUser = this.uService.usuario.ImagenUrl;
    }
  }

  scores = [0, 0];
  weapons = [
    'rock',
    'paper',
    'scissors'
  ]
  playerSelected = -1;
  loading = false;
  isResultShow = false;

  // theResult -  0 winner
  //              1 lose
  //              2 tie
  theResult = 0
  enemySelected = -1;

  pick(weapon: number): void {
    // return immediately when still loading. You don't want
    // the user to spam the button.
    if (this.loading) return;
    this.loading = true;
    this.playerSelected = weapon;

    //create a delay to simulate enemy's turn.
    setTimeout(() => {
      this.loading = false;
      // generate a number from 0 -2 
      const randomNum = Math.floor(Math.random() * 3);
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    }, Math.floor(Math.random() * 500) + 200);
  }

  reset(): void {
    this.scores = [0, 0];
  }

  checkResult(): void {
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;
    // if you and the enemy have the same weapon, then it is a tie.
    if (playerPick == enemyPick) {
      this.theResult = 2;
    }

    else if ((playerPick - enemyPick + 3) % 3 == 1) {
      // YOU WIN
      this.theResult = 0;
      this.scores[0] = this.scores[0] + 1;
    }
    else {
      // YOU LOSE
      this.theResult = 1;
      this.scores[1] = this.scores[1] + 1;
    }

    if (this.scores[0] > this.scores[1]) {
      this.btnMensaje = "Salir y guardar puntuación"
    }
  }

  salir() {
    this.guardarResultados();
    this.router.navigate(['/juegos']);
  }

  guardarResultados() {
    if (this.scores[0] > this.scores[1]) {

      let puntos: PuntuacionInterface = {
        ImagenUrl: this.imagenUser,
        Jugador: this.nombre,
        Juego: "Piedra-Papel-Tijeras",
        Puntuacion: "Jugador: " + this.scores[0] + "\nLa Máquina: " + this.scores[1]
      }

      this.dataApi.AgregarUno(puntos, "puntuacion");
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { PuntuacionInterface } from 'src/app/clases/Puntuacion';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.scss']
})
export class TaTeTiComponent implements OnInit {

  nombre = "";
  imagenUser = "";

  PLAYER_COMPUTER;
  PLAYER_HUMAN;
  DRAW;
  currentPlayer;

  board: any[];
  lastWinner: any;
  gameOver: boolean;
  boardLocked: boolean;

  constructor(private uService: UsuarioService, private router: Router, private dataApi: DataApiService) { }

  ngOnInit() {
    this.nombre = "Anónimo";
    this.imagenUser = "assets/imagenes/default-user.png";

    if (this.uService.usuario.Nombre != "") {
      this.nombre = this.uService.usuario.Nombre;
      this.imagenUser = this.uService.usuario.ImagenUrl;
    }

    this.PLAYER_COMPUTER = { name: 'La Máquina', symbol: 'o' };
    this.PLAYER_HUMAN = { name: this.nombre, symbol: 'x' };
    this.DRAW = { name: 'Empate' };
    this.currentPlayer = this.PLAYER_HUMAN;

    this.newGame();
  }

  square_click(square) {
    if (square.value === '' && !this.gameOver) {
      square.value = this.PLAYER_HUMAN.symbol;
      this.completeMove(this.PLAYER_HUMAN);
    }
  }

  computerMove(firstMove: boolean = false) {
    this.boardLocked = true;

    setTimeout(() => {
      let square = firstMove ? this.board[4] : this.getRandomAvailableSquare();
      square.value = this.PLAYER_COMPUTER.symbol;
      this.completeMove(this.PLAYER_COMPUTER);
      this.boardLocked = false;
    }, 600);
  }

  completeMove(player) {
    if (this.isWinner(player.symbol))
      this.showGameOver(player);
    else if (!this.availableSquaresExist())
      this.showGameOver(this.DRAW);
    else {
      this.currentPlayer = (this.currentPlayer == this.PLAYER_COMPUTER ? this.PLAYER_HUMAN : this.PLAYER_COMPUTER);

      if (this.currentPlayer == this.PLAYER_COMPUTER)
        this.computerMove();
    }
  }

  availableSquaresExist(): boolean {
    return this.board.filter(s => s.value == '').length > 0;
  }

  getRandomAvailableSquare(): any {
    let availableSquares = this.board.filter(s => s.value === '');
    var squareIndex = this.getRndInteger(0, availableSquares.length - 1);

    return availableSquares[squareIndex];
  }

  showGameOver(winner) {
    this.gameOver = true;
    this.lastWinner = winner;

    if (winner !== this.DRAW) {
      this.currentPlayer = winner;
      if (winner.symbol == "x") {
        Swal.fire({
          title: "Ganaste!",
          type: "success"
        });
        this.guardarResultados();
      } else {
        Swal.fire({
          title: 'PERDISTE!',
          animation: false,
          type: 'error',
          customClass: {
            popup: 'animated tada'
          }
        });
      }
    }
    else {
      Swal.fire({
        title: "Empate!",
        type: "info"
      });
    }
  }

  get winningIndexes(): any[] {
    return [
      [0, 1, 2],  //top row
      [3, 4, 5],  //middle row
      [6, 7, 8],  //bottom row
      [0, 3, 6],  //first col
      [1, 4, 7],  //second col
      [2, 5, 8],  //third col
      [0, 4, 8],  //first diagonal
      [2, 4, 6]   //second diagonal
    ];
  }

  isWinner(symbol): boolean {

    for (let pattern of this.winningIndexes) {
      const foundWinner = this.board[pattern[0]].value == symbol
        && this.board[pattern[1]].value == symbol
        && this.board[pattern[2]].value == symbol;

      if (foundWinner) {
        for (let index of pattern) {
          this.board[index].winner = true;
        }


        return true;
      }
    }

    return false;
  }

  newGame() {
    this.board = [
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' },
      { value: '' }, { value: '' }, { value: '' }
    ];

    this.gameOver = false;
    this.boardLocked = false;

    if (this.currentPlayer == this.PLAYER_COMPUTER) {
      this.boardLocked = true;
      this.computerMove(true);
    }
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  salir() {
    this.router.navigate(['/juegos']);
  }

  guardarResultados() {

    let puntos: PuntuacionInterface = {
      ImagenUrl: this.imagenUser,
      Jugador: this.nombre,
      Juego: "Ta-Te-Ti",
      Puntuacion: "Le ganó a la máquina!"
    }

    this.dataApi.AgregarUno(puntos, "puntuacion");

  }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})
export class MenuCardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }


  ngOnInit() {
  }

  // Juego(tipo: string) {
  //   switch (tipo) {
  //     case 'Adivina':
  //         this.router.navigate(['/juegos/Adivina']);
  //       break;
  //     case 'Agilidad':
  //         this.router.navigate(['/juegos/Agilidad']);
  //       break;
  //     case 'AdivinaMasListado':
  //         this.router.navigate(['/juegos/AdivinaMasListado']);
  //       break;
  //     case 'AgilidadaMasListado':
  //         this.router.navigate(['/juegos/AgilidadaMasListado']);
  //       break;
  //     case 'memokey':
  //       this.router.navigate(['/juegos/Memokey']);
  //     break;
  //   }
  // }
}

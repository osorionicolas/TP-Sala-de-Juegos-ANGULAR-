import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { PuntuacionInterface } from 'src/app/clases/Puntuacion';
import { MatTableDataSource } from '@angular/material';
import { UsuarioService } from 'src/app/servicios/Usuario.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lista-puntuaciones',
  templateUrl: './lista-puntuaciones.component.html',
  styleUrls: ['./lista-puntuaciones.component.scss']
})
export class ListaPuntuacionComponent implements OnInit {

  private displayedColumns: string[] = ['ImagenUrl', 'Jugador', 'Juego', 'Puntuacion'];
  private puntuaciones: PuntuacionInterface[];
  private dataSource = new MatTableDataSource(this.puntuaciones);
  private noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));

  constructor(private dataApi: DataApiService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.dataApi.TraerTodos('puntuacion')
      .subscribe(puntuaciones => {
        this.puntuaciones = puntuaciones;
        this.dataSource = new MatTableDataSource(this.puntuaciones);
        this.noData = this.dataSource.connect().pipe(map((data: any[]) => data.length === 0));
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

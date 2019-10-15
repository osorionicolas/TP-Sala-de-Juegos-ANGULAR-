import { Component, OnInit, Input } from '@angular/core';
import { DataApiService } from 'src/app/servicios/DataApi.service';
import { UsuarioInterface } from 'src/app/clases/Usuario';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  private displayedColumns: string[] = ['Imágen', 'Nombre', 'Email'];
  private usuarios: UsuarioInterface[];
  private dataSource;

  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    this.dataApi.TraerTodos('usuarios')
      .subscribe(users => {
        this.usuarios = users;
        this.dataSource = new MatTableDataSource(this.usuarios);
      });
  }
}

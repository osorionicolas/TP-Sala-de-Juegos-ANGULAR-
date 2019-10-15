import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { PieComponent } from './componentes/pie/pie.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { MaterialModule } from './material/material.module';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { MenuCardComponent } from './componentes/menu-card/menu-card.component';
import { ListaPuntuacionComponent } from './componentes/lista-puntuaciones/lista-puntuaciones.component';
import { AdivinaElNumeroComponent } from './componentes/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { PiedraPapelTijeraComponent } from './componentes/piedra-papel-tijera/piedra-papel-tijera.component';
import { TaTeTiComponent } from './componentes/ta-te-ti/ta-te-ti.component';
import { SimonComponent } from './componentes/simon/simon.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CabeceraComponent,
    PieComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    ListaUsuariosComponent,
    QuienSoyComponent,
    MenuCardComponent,
    ListaPuntuacionComponent,
    AdivinaElNumeroComponent,
    AgilidadAritmeticaComponent,
    PiedraPapelTijeraComponent,
    TaTeTiComponent,
    SimonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

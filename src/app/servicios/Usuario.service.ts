import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UsuarioInterface, } from '../clases/Usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataApiService } from './DataApi.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuario: UsuarioInterface;
    estaLogeado: boolean;
    private redirectUrl: string = '/';
    private loginUrl: string = '/logearse';
    private incioUrl: string = '';

    constructor(private afsAuth: AngularFireAuth, private db: AngularFirestore, private router: Router, private dataApi: DataApiService) {
        this.usuario = this.UsuarioVacio();
    }

    RegistrarUsuario(usuario: UsuarioInterface) {
        return new Promise(() => {
            this.afsAuth.auth.createUserWithEmailAndPassword(usuario.Email, usuario.Password)
                .then(
                    (userData) => {
                        return userData.user.updateProfile({
                            displayName: usuario.Nombre,
                            photoURL: usuario.ImagenUrl
                        });
                    },
                    (err) => {
                        console.log(err);
                        this.UsuarioVacio();
                        Swal.fire({
                            title: "Error al registrarse",
                            text: "Sucedió un error al registrarse, intente nuevamente.",
                            type: "error"
                        });
                    }
                )
                .then(
                    () => {
                        this.EstaLogeado().pipe(take(1)).subscribe(
                            (userData) => {
                                if (userData) {
                                    usuario.Password = '';
                                    usuario.Uid = userData.uid;
                                    usuario.Email = userData.email;
                                    usuario.ImagenUrl = userData.photoURL;
                                    usuario.Nombre = userData.displayName;
                                    this.router.navigate(['']);
                                    this.db.collection('usuarios').doc(userData.uid).set(usuario);
                                    Swal.fire({
                                        position: 'top-end',
                                        type: 'success',
                                        title: 'Registro exitoso!',
                                        showConfirmButton: false,
                                        timer: 1500
                                      })
                                }
                                else {
                                    this.UsuarioVacio();
                                }
                            },
                            (err) => {
                                console.log(err);
                                this.UsuarioVacio();

                                Swal.fire({
                                    title: "Error inesperado",
                                    text: "Sucedió un error inesperado.",
                                    type: "error"
                                });

                                // this.ns.error("Error inesperado", "Sucedió un error inesperado.");
                            });
                    });
        });
    }

    LoguearUsuario(email: string, password: string) {
        return new Promise(() => {
            this.afsAuth.auth.signInWithEmailAndPassword(email, password)
                .then(
                    (userData) => {
                        if (userData) {
                            this.dataApi.TraerUno(userData.user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {
                                this.usuario.Uid = userx.Uid;
                                this.usuario.Email = userx.Email;
                                this.usuario.ImagenUrl = userx.ImagenUrl;
                                this.usuario.Nombre = userx.Nombre;
                                Swal.fire({
                                    position: 'top-end',
                                    type: 'success',
                                    title: 'Logueo exitoso!',
                                    showConfirmButton: false,
                                    timer: 1500
                                  })
                                this.router.navigate(['']);
                            });
                        }
                        else {
                            this.usuario = this.UsuarioVacio();
                        }
                    },
                    (err) => {
                        console.log(err);
                        this.usuario = this.UsuarioVacio();
                        Swal.fire({
                            title: "Error al loguearse",
                            text: "La cuenta es inexistente, o las credenciales son incorrectas.",
                            type: "error"
                        });
                    });
        });
    }

    DeslogearUsuario() {
        this.usuario = this.UsuarioVacio();
        this.afsAuth.auth.signOut();
    }

    EstaLogeado() {
        return this.afsAuth.authState.pipe(map(auth => auth));
    }

    UsuarioVacio() {
        return {
            Uid: '',
            Nombre: '',
            Email: '',
            Password: '',
            ImagenUrl: ""
        }
    }

    isUserLoggedIn(): boolean {
        return this.estaLogeado;
    }
    setRedirectUrl(url: string): void {
        this.redirectUrl = url;
    }
    getLoginUrl(): string {
        return this.loginUrl;
    }
    getInicioUrl(): string {
        return this.incioUrl;
    }

    EstadoLogeo() {
        this.afsAuth.auth.onAuthStateChanged(
            (user) => {
                if (user) {
                    this.dataApi.TraerUno(user.uid, 'usuarios').pipe(take(1)).subscribe(userx => {
                        this.usuario = userx;
                    });

                    this.estaLogeado = true;
                }
                else
                    this.estaLogeado = false;
            },
            () => {
                this.estaLogeado = false;
            }
        );
    }
}






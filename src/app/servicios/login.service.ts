import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
//import { error } from "console";
import { map } from 'rxjs/operators'


@Injectable()
export class LoginService {


  //AngularFireAuth Autentificacion FireBase
  constructor(private authService: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password)
        .then(datos => resolve(datos),
          error => reject(error)
        )
    })
  }


  //Devuelve el usuario que se ha autenticado
  getAut(){
    return this.authService.authState.pipe(
      map(auth => auth)
    );
  }

  logout(){
    this.authService.signOut();
  }

  registrarse(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password)
      .then( datos => resolve(datos),
       error => reject(error))
    });
  }

}

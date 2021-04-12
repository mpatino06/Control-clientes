import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { CanActivate, Router } from "@angular/router";
import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

  //private afAuth: AngularFireAuth permite ver si un usuario esta autenticado
  constructor(private router: Router,
              private afAuth: AngularFireAuth){}


  canActivate() : Observable<boolean>{
    return this.afAuth.authState.pipe(
      map(auth=> {
        if(!auth){
          this.router.navigate(['/login']);
          return false;
        }
        else{
          return true;
        }
      })
    )
  }

}

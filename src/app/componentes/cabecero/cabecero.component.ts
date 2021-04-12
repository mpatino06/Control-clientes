import { LoginService } from './../../servicios/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {
  isLoggedIn: boolean;    //variable que indica si el usuario esta logueado
  loggedInUser: string;  // nombre de usuario logeado

  permitirRegistro: boolean;

  constructor(private router: Router,
    private loginService: LoginService,
    private configuracionServicio: ConfiguracionServicio) { }

  ngOnInit(): void {
    this.loginService.getAut().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      }
      else {
        this.isLoggedIn = false;
      }
    })

    this.configuracionServicio.getConfiguracion().subscribe(configuracion => {
      this.permitirRegistro = configuracion.permitirRegistro;
    })
  }

  logout() {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);

  }

}

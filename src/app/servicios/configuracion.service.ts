import { Configuracion } from './../modelo/configuracion.model';
import { AngularFirestoreDocument , AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core';

@Injectable()
export class ConfiguracionServicio {
  configuracioDoc: AngularFirestoreDocument<Configuracion>;
  configuracion: Observable<Configuracion>;

  //id unico de la coleccion de configuracion
  id = '1';

  constructor(private db: AngularFirestore){}

  getConfiguracion(): Observable<Configuracion> {
    this.configuracioDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracion = this.configuracioDoc.valueChanges();
    return this.configuracion;
  }

  modificarConfiguracion(configuracion : Configuracion){
    this.configuracioDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    this.configuracioDoc.update(configuracion);
  }

}

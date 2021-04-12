import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Cliente } from '../modelo/cliente.modelo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ClienteServicio{
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clienteDoc: AngularFirestoreDocument<Cliente>;

  //los metodos retornan colecciones de tipo Observable
  clientes: Observable<Cliente[]>;
  cliente: Observable<Cliente>;

  constructor(private db: AngularFirestore){
    this.clientesColeccion = db.collection('clientes', ref => ref.orderBy('nombre','asc'));
  }

  getClientes(): Observable<Cliente[]>{
    //obtener clientes firestore
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map( cambios => {
        return cambios.map( accion => {
          const datos = accion.payload.doc.data() as Cliente;
          datos.id = accion.payload.doc.id;
          return datos;
        })
      })
    );
    return this.clientes;
  }

  agregarCliente(cliente: Cliente){
    this.clientesColeccion.add(cliente);
  }

  getCliente(id: string){
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map( accion => {
        if(accion.payload.exists === false ){
          return null;
        }
        else{
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  modificarCliente(cliente: Cliente){
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  eliminarCliente(id: string){
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.clienteDoc.delete();
  }

}

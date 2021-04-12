import { ClienteServicio } from './../../servicios/cliente.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.modelo';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[];
  cliente : Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }

  //accedo al form y al boton por medio de viewchil referencia local
  @ViewChild("clienteForm") clienteForm : NgForm;
  @ViewChild("botonCerrar") botonCerrar : ElementRef;


  constructor(private clienteServicio: ClienteServicio,
              private flasMessages: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.clienteServicio.getClientes().subscribe(
      cliente => {
        this.clientes = cliente;
      });
  }

  getSaldoTotal(){
    let saldototal: number = 0;
    if(this.clientes){
      this.clientes.forEach( cliente => {
        saldototal += cliente.saldo;
      })
    }
    return saldototal;
  }

  agregar({value, valid}: {value: Cliente, valid: boolean}){
    if(!valid){
      this.flasMessages.show('Por favor llena el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      //agregar nuevo componente
      this.clienteServicio.agregarCliente(value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  }

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }

}

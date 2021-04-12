import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.modelo';
import { ClienteServicio } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})

export class EditarClienteComponent implements OnInit {

  cliente : Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  }
  id: string;

  constructor(private clienteServicio: ClienteServicio ,
              private flasMessages: FlashMessagesService,
              private route: ActivatedRoute,
              private router: Router

    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clienteServicio.getCliente(this.id).subscribe( cliente => {
      this.cliente = cliente;
    })
  }

  guardar({value, valid}: {value: Cliente, valid : boolean}){
    if(!valid){
      this.flasMessages.show('Por favor llenar el formulario correctamente', {
        cssClass: 'alert-danger', timeout: 4000
      });
    }
    else{
      //modificar cliente
      value.id = this.id;
      this.clienteServicio.modificarCliente(value);
      this.router.navigate(['/']);

    }
  }

  eliminar(){
    if(confirm('Seguro que desea eliminar el registro?')){
      this.clienteServicio.eliminarCliente(this.id);
      this.router.navigate(['/']);
    }
  }

}

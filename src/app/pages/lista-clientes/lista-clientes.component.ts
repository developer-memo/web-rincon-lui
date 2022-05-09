import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { ClienteGeneroMap, ClienteStatusMap } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  public clienteStatusMap = ClienteStatusMap;
  public clienteGeneroMap = ClienteGeneroMap;

  public clientes:any[] = [];

  constructor(
              private clientesServ: UsuarioService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllClientes();
  }

  

  /**
   * Método para obtener los clientes
   */
  public getAllClientes = () =>{
    this.clientesServ.getClientesService().subscribe( (resp:any) =>{
      
      this.clientes = resp.usuarios || [];
      
    }, (err) =>{
      Swal.fire('Error', 'En este momento no es posible cargar los clientes. Inténtelo más tarde.', 'error');
    })
  }


  /**
   * Método para navegar a detalle cliente
   * @param cliente => Objeto con datos del cliente
   */
  public navegarDetalleCliente = (cliente:any) =>{
    const ObjCliente = JSON.stringify(cliente);
    this.router.navigate(['dashboard/detalle-clientes', ObjCliente]);

  }



  /**
   * Método para eliminar usuario por id
   */
  public deleteUser = (id:any) =>{
    Swal.fire({
      title: '¿Desea eliminar este usuario de la lista?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {
        this.clientesServ.deleteUserService(id).subscribe( (resp:any) =>{
          Swal.fire('Bien!', resp.msg, 'success');
          this.clientes = this.clientes.filter( cl => cl.id_us != id );
    
        }, err =>{
          Swal.fire('Error', err.error.msg, 'error');
          
        })
        setTimeout(() => { Swal.close() }, 2000);
        
      }
    });


    
    
  }
  

}

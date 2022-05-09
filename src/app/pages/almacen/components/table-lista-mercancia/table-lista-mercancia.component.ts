import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MercanciaService } from 'src/app/services/mercancia.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-table-lista-mercancia',
  templateUrl: './table-lista-mercancia.component.html',
  styleUrls: ['./table-lista-mercancia.component.css']
})
export class TableListaMercanciaComponent implements OnInit {

  @Input() arrMercancia: any;
  //@Output() mercaById = new EventEmitter<Object>();

  constructor(
              private router: Router,
              private mercanciaSrv: MercanciaService
  ) { }

  ngOnInit(): void {
  }


  /**
   * Emite el objeto al componente de detalle de mercancía
   */
  public detalleMerca = (id:any) =>{
    //this.mercaById.emit(merca);    
    this.router.navigate(['dashboard/detalle-mercancia', id]);
  }


  /**
   * Método para eliminar mercancia de la lista
   */
  public deleteMercancia = (id:any) =>{
    Swal.fire({
      title: '¿Desea eliminar esta mercancía de la lista?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.mercanciaSrv.deleteMercanciaService(id).subscribe( (resp:any) =>{
          Swal.fire('Bien!', resp.msg, 'success');
          this.arrMercancia = this.arrMercancia.filter( (mr:any) => mr.id_merca != id);
          
        }, (err:any) =>{
          Swal.fire('Error', err.error.msg, 'error');
        });
        setTimeout(() => { Swal.close() }, 2000);
      }
    });
    
  }

}

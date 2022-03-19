import { Component, OnInit } from '@angular/core';
import { MercanciaService } from 'src/app/services/mercancia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-mercancia',
  templateUrl: './lista-mercancia.component.html',
  styleUrls: ['./lista-mercancia.component.css']
})
export class ListaMercanciaComponent implements OnInit {

  public arrMercancia: any = [];

  constructor(
              private mercanciaSrv: MercanciaService,
  ) { }

  ngOnInit(): void {
    this.getAllMercancia();
  }


  /**
   * Método para obtener toda la mercancía
   */
  public getAllMercancia = () =>{
    this.mercanciaSrv.getAllMercanciaService().subscribe( resp =>{
      this.arrMercancia = resp['mercancia'];      
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
      setTimeout(() => { Swal.close() }, 2000);
    })
  };

}

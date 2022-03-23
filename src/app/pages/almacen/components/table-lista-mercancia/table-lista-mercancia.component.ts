import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-lista-mercancia',
  templateUrl: './table-lista-mercancia.component.html',
  styleUrls: ['./table-lista-mercancia.component.css']
})
export class TableListaMercanciaComponent implements OnInit {

  @Input() arrMercancia: any;
  //@Output() mercaById = new EventEmitter<Object>();

  constructor(
              private router: Router
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

}

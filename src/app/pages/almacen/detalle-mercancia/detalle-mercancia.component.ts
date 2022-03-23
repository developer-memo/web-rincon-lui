import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MercanciaService } from 'src/app/services/mercancia.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-mercancia',
  templateUrl: './detalle-mercancia.component.html',
  styleUrls: ['./detalle-mercancia.component.css']
})
export class DetalleMercanciaComponent implements OnInit {

  public idMerca: string = '';
  public detaMerca: any = [];

  constructor(
              private routeActive: ActivatedRoute,
              private mercanciaSrv: MercanciaService,
              private location: Location,
  ) { }

  ngOnInit(): void {
    this.routeActive.params.subscribe( data =>{
      this.idMerca = data['id'];   
      
      this.getMercanciaById();
    });
  }


  /**
   * Método para obtener mercancía por id
   */
  public getMercanciaById = () =>{
    this.mercanciaSrv.getMercaByIdService(this.idMerca).subscribe( (resp:any) =>{
      resp.mercaById.map( (merca:any) =>  this.detaMerca = merca );
      console.log(this.detaMerca);
      
    });
  }




  public cargarEditFormulario = () =>{

  }



  goBack(){
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MercanciaService } from 'src/app/services/mercancia.service';
import { DataTallas } from 'src/app/mockdata/mockdata-mercancia';
import { CurrencyPipe, Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-mercancia',
  templateUrl: './detalle-mercancia.component.html',
  styleUrls: ['./detalle-mercancia.component.css']
})
export class DetalleMercanciaComponent implements OnInit {

  public formSubmitted = false;
  public idMerca: string = '';
  public detaMerca: any = [];
  public dataTalla = DataTallas;
  public formEditMercancia: FormGroup;


  constructor(
              private routeActive: ActivatedRoute,
              private mercanciaSrv: MercanciaService,
              private currencyPipe: CurrencyPipe,
              private location: Location,
              private fb: FormBuilder,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.routeActive.params.subscribe( data =>{
      this.idMerca = data['id'];   
      this.getMercanciaById();
      this.currencyFormatted();
    });
  }


  
  public getMercanciaById = () =>{
    this.mercanciaSrv.getMercaByIdService(this.idMerca).subscribe( (resp:any) =>{
      resp.mercaById.map( (merca:any) => this.detaMerca = merca );
      this.getDataForm(this.detaMerca);
    });
  }


  public formInit = () => {
    this.formEditMercancia = this.fb.group({
      tipo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      talla: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      comentario: ['', [Validators.required]],
    })
  }

  public getDataForm = (data:any) => {    

    const fecha = data.fecha_merca.split('T');
    this.formEditMercancia.setValue({
      'tipo': data.tipo_merca,
      'marca': data.marca_merca,
      'genero': data.genero_merca,
      'talla': data.talla_merca,
      'cantidad': data.cantidad_merca,
      'valor': JSON.stringify(data.valor_merca),
      'fecha': fecha[0],
      'comentario': data.comentario_merca,
    });
  }



  /**
   * Método para formatear valor a moneda
   */
   public currencyFormatted = () =>{
    this.formEditMercancia.valueChanges.subscribe( form =>{
      if (form.valor) {
        this.formEditMercancia.patchValue({
          valor: this.currencyPipe.transform( form.valor.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '3.0' )
        }, {emitEvent:false});
      }
    });
  }



  public actualizarMercancia = () =>{
    this.formSubmitted = true;
    let dataForm = {}; 

    if ( this.formEditMercancia.invalid ) {
      return;
    }

    this.formEditMercancia.value.valor = Number(this.formEditMercancia.value.valor.slice(1,100).replaceAll(',', ''));
    
    dataForm = { ...this.formEditMercancia.value, id:this.idMerca }
    this.mercanciaSrv.putMercaByIdService(dataForm).subscribe( (resp:any) =>{
      Swal.fire('Bien!', resp.msg, 'success');
      
    }, (err) =>{
      Swal.fire('Error', err.msg, 'error');
    });
    setTimeout(() => { this.router.navigate(['dashboard/lista-mercancia']); Swal.close() }, 1500);
  }



   public campoNoValido = (campo:any): boolean =>{
    if ( this.formEditMercancia.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }



  public goBack = () =>{
    this.location.back();
  }

}

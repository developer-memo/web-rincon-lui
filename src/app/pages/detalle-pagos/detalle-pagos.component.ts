import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagosService } from 'src/app/services/pagos.service';

@Component({
  selector: 'app-detalle-pagos',
  templateUrl: './detalle-pagos.component.html',
  styleUrls: ['./detalle-pagos.component.css']
})
export class DetallePagosComponent implements OnInit {

  public pago:any = {};
  public formEditPago:FormGroup;
  public formSubmitted = false;

  constructor(
              private routeActive: ActivatedRoute,
              private pagosServ: PagosService,
              private currencyPipe: CurrencyPipe,
              private location: Location,
              private router: Router,
              private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.routeActive.params.subscribe( data =>{
      this.pago = JSON.parse( data['pago'] ) || {};
    });

    this.cargarFormulario();
    this.currencyFormatted();
  }




  /**
   * Método para actualizar pagos
   */
  public editarPagos = () =>{
    this.formSubmitted = true;
    
    if ( this.formEditPago.invalid ) {
      return;
    }

    this.formEditPago.value.valor = Number(this.formEditPago.value.valor.slice(1,100).replaceAll(',', ''));

    this.pagosServ.updatePagosService(this.formEditPago.value, this.pago.id_pag).subscribe( (resp:any) =>{
      Swal.fire('Bien!', resp.msg, 'success');
      setTimeout(() => { this.router.navigate(['dashboard/detalle-credito', this.pago.id_us]); Swal.close(); }, 1500);

    }, (err) =>{      
      Swal.fire('Error', err.error.msg, 'error');
      setTimeout(() => { Swal.close(); }, 1500);
    })

  }



  /**
   * Método para formatear valor a moneda
   */
   public currencyFormatted = () =>{
    this.formEditPago.valueChanges.subscribe( form =>{
      if (form.valor) {
        this.formEditPago.patchValue({
          valor: this.currencyPipe.transform( form.valor.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '3.0' )
        }, {emitEvent:false});
      }
    });
    
  }



  /**
   * Método para cargar el formulario
   */
  public cargarEditFormulario = () =>{
    const fecha = this.pago['fecha_pag'].split('T');
    this.formEditPago.setValue({
      'valor': JSON.stringify(this.pago.valor_pag),
      'fecha': fecha[0],
      'comentario': this.pago.comentario_pag,
      'estado': this.pago.estado_pag == 1? true : false
    });
  }


  /**
   * Método para cargar el formulario
   */
  public cargarFormulario = () =>{
    this.formEditPago = this.fb.group({
      valor: ['', [Validators.required, Validators.minLength(3)]],
      fecha: ['', [Validators.required]],
      comentario: ['', [Validators.required, Validators.minLength(5)]],
      estado: ['', [Validators.required]],
    })
  }


  /**
   * Método para validar los campos del formulario
   * @param campo => Campo a validar
   */
  public campoNoValido = (campo:any): boolean =>{
    if ( this.formEditPago.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }


  goBack(){
    this.location.back();
  }


}

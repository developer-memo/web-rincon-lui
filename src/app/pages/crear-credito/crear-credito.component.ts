import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';
import Swal from 'sweetalert2';
import { CreditosService } from 'src/app/services/creditos.service';
import { of } from "rxjs";
import { MercanciaService } from '../../services/mercancia.service';

@Component({
  selector: 'app-crear-credito',
  templateUrl: './crear-credito.component.html',
  styleUrls: ['./crear-credito.component.css']
})
export class CrearCreditoComponent implements OnInit {

  public formSubmitted:boolean = false;
  public creditoActivo:boolean = false;
  public addMerca:boolean = true;
  public mercancia:any = [];
  public idCliente:string;
  public idCredito:string;
  public formCrearCredito:FormGroup;
  public formMercaCredito:FormGroup;

  constructor( 
              private routeActive: ActivatedRoute,
              private creditoServ: CreditosService,
              private mercaSrv: MercanciaService,
              private currencyPipe: CurrencyPipe,
              private location: Location,
              private fb: FormBuilder,
              private router: Router,
  ) { }

  ngOnInit(): void {
    this.routeActive.params.subscribe( data => {
      this.idCliente = JSON.parse( data['idUs'] ) || [];

      this.getCreditoById(this.idCliente)
    });

    this.cargarFormulario();
    this.currencyFormatted();    
    this.getAllMercancia();
  }


  /**
   * Método para cargar el formulario
   */
   public cargarFormulario = () =>{
    this.formCrearCredito = this.fb.group({
      monto: ['', [Validators.required, Validators.minLength(4)]],
      fecha: ['', [Validators.required]],
      periodo: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.minLength(1)]],
      valorcuota: ['', [Validators.required, Validators.minLength(4)]],
      comentario: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.formMercaCredito = this.fb.group({
      tipo: ['', [Validators.required]],
    });
  }


  /**
   * Método para obtener el credito por cliente
   * @param idCliente => ID del cliente
   */
  public getCreditoById = (idCliente:any) => {
    this.creditoServ.getCreditoByIdService(idCliente).subscribe( (resp:any) =>{

      if( resp.credito[0].estado_cred ){
        Swal.fire('Crédito activo', 'No se puede crear créditos para este cliente.', 'error');
        this.creditoActivo = true;
        setTimeout(() => { Swal.close() }, 2000);

      }else{
        this.creditoActivo = false;
        return;
      }
    }, error => error);
  }



  /**
   * Método para obtener la mercancía
   */
  public getAllMercancia = () =>{
    this.mercaSrv.getAllMercanciaService().subscribe( (resp:any) =>{
      this.mercancia = resp.mercancia || [];
      console.log(this.mercancia);
      
    }, err =>{
      Swal.fire('Error', err.error.msg, 'error');
      setTimeout(() => { Swal.close() }, 2000);
    })
    
  }

  

  /**
   * Método para formatear valor a moneda
   */
   public currencyFormatted = () =>{
    this.formCrearCredito.valueChanges.subscribe( form =>{
      if (form.monto) {
        this.formCrearCredito.patchValue({
          monto: this.currencyPipe.transform( form.monto.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '3.0' )
        }, {emitEvent:false});
      }

      if (form.valorcuota) {
        this.formCrearCredito.patchValue({
          valorcuota: this.currencyPipe.transform( form.valorcuota.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '3.0' )
        }, {emitEvent:false});
      }
    });
    
  }


 /**
  * Método para crear créditos
  */
  public crearCredito = () =>{
    this.formSubmitted = true;

    if( this.formCrearCredito.invalid ){
      return;
    }    

    this.formCrearCredito.value.monto = Number(this.formCrearCredito.value.monto.slice(1,100).replaceAll(',', ''));

    this.formCrearCredito.value.valorcuota = Number(this.formCrearCredito.value.valorcuota.slice(1,100).replaceAll(',', ''));

    this.creditoServ.createCreditoService( this.formCrearCredito.value, this.idCliente ).subscribe( (resp:any) =>{
      this.addMerca = true;
      this.idCredito = resp.idCredito;
      //this.getAllMercancia();
      Swal.fire('Bien!', `${resp.msg} Puede agregar la mercancía.`, 'success');
      setTimeout(() => { Swal.close() }, 2000);
      //setTimeout(() => { this.router.navigate(['dashboard/lista-creditos']); Swal.close() }, 1500);

    }, (err) =>{
      Swal.fire('Error', err.error.msg, 'error');
      setTimeout(() => { Swal.close() }, 2000);
    })
  }



  /**
   * Método para agregar mercancía al crédito
   */
  public addMercaCredito = () =>{

  }




  /**
   * Método para validar los campos del formulario
   * @param campo => Campo a validar
   */
  public campoNoValido = (campo:any): boolean =>{
    if ( this.formCrearCredito.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }


  goBack(){
    this.location.back();
  }



}

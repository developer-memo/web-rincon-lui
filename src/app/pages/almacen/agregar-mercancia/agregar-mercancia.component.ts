import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTallaCalzado, DataTallaRopa } from 'src/app/mockdata/mockdata-tallas';
import { MercanciaService } from 'src/app/services/mercancia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-mercancia',
  templateUrl: './agregar-mercancia.component.html',
  styleUrls: ['./agregar-mercancia.component.css']
})
export class AgregarMercanciaComponent implements OnInit {

  public formSubmitted = false;
  public dataTalla = [];

  public formAgregarMercancia = this.fb.group({
    tipo: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    genero: ['', [Validators.required]],
    talla: ['', [Validators.required]],
    cantidad: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    comentario: ['', [Validators.required]],
  });

  constructor(
              private fb: FormBuilder,
              private router: Router,
              private mercanciaSvc: MercanciaService,
  ) { }

  ngOnInit(): void {
  }


  /**
   * Método para obtener el valor de tipo de mercancía
   * @param event => Valor del select
   */
  public getTipoMercanciaValue = (event: any) =>{
    if(event.value === 'Calzado') {
      this.dataTalla = DataTallaCalzado;
      
    } else {
      this.dataTalla = DataTallaRopa;
    }
  }


  /**
   * Método para agregar mercancía
   */
  public agregarMercancia = () =>{
    this.formSubmitted = true;

    if ( this.formAgregarMercancia.invalid ) {
      return; 
    }

    this.mercanciaSvc.insertMercanciaService(this.formAgregarMercancia.value).subscribe( (resp:any) =>{
      Swal.fire('Bien!', resp.msg, 'success');
      setTimeout(() => { this.router.navigate(['dashboard/lista-mercancia']); Swal.close() }, 1500);
      
    }, (err) =>{
      Swal.fire('Error', err.error.msg, 'error');
      setTimeout(() => { Swal.close() }, 2000);
    });
    

  }




  /**
   * Método para validar los campos del formulario
   * @param campo => Campo a validar
   */
   public campoNoValido = (campo:any): boolean =>{
    if ( this.formAgregarMercancia.get(campo).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }


}

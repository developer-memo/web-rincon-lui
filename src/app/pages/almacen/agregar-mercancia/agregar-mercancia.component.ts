import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTallaCalzado, DataTallaRopa } from 'src/app/mockdata/mockdata-tallas';

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

    console.log(this.formAgregarMercancia.value);
    

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

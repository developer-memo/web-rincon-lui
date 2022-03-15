import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-mercancia',
  templateUrl: './agregar-mercancia.component.html',
  styleUrls: ['./agregar-mercancia.component.css']
})
export class AgregarMercanciaComponent implements OnInit {

  public formSubmitted = false;

  public formAgregarMercancia = this.fb.group({
    tipo: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    genero: ['', [Validators.required]],
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

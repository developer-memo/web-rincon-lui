import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreditosForm } from '../interfaces/creditos-form.interface';

const BASE_URL: String = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  public httpOptions:any = {}; 

  constructor(
              private http: HttpClient,
  ) {

    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'x-token': localStorage.getItem('token')}) };
    
  }


  /**
   * Método de servicio para crear créditos
   * @param formData => Datos del formulario
   * @param iUs => ID del cliente
   */
  public createCreditoService = (formData:CreditosForm, idUs:any) =>{
    
    formData.idUs = idUs;
    return this.http.post(`${BASE_URL}/insertCredito`, formData, this.httpOptions).pipe(
      tap( resp => resp )
    )

  }

  /**
   * Método de servicio para obtener todos los créditos
   */
  public getAllCreditosService = () =>{

    return this.http.get(`${BASE_URL}/allCreditos`, this.httpOptions).pipe(
      map( resp => resp )
    )

  }


  /**
   * Método de servicio para obtener el crédito por cliente
   * @param idUs => ID del cliente
   */
  public getCreditoByIdService = (idUs:any) =>{

    return this.http.get(`${BASE_URL}/credito/${idUs}`, this.httpOptions).pipe(
      map( resp => resp )
    )

  }


  /**
   * Método de servicio para actualizar créditos
   * @param formData => Datos del formulario
   * @param idCredito => ID del crédito
   */
  public updateCreditoService = (formData: CreditosForm, idCredito:any) =>{
    
    formData.idCredito = idCredito;
    formData.estado = formData.estado == true? 1 : 0;
    
    return this.http.put(`${BASE_URL}/updateCredito`, formData, this.httpOptions).pipe(
      tap( resp => resp )
    )

  }



}

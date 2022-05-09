import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BASE_URL: String = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  public httpOptions:any = {}; 

  constructor(
              private http: HttpClient,
  ) {

    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'x-token': localStorage.getItem('token')}) };
    
  }


  /**
   * Método de servicio para crear pagos
   * @param formData => Datos del formulario
   * @param idCredito => ID del crédito 
   * @param idUs => ID del cliente
   */
  public createPagosService = (formData:any, idCredito:any, idUs:any) =>{
    formData.idUs = idUs;
    formData.idCredito = idCredito;
    
    return this.http.post(`${BASE_URL}/crearPago`, formData, this.httpOptions).pipe(
      tap( resp => resp )
    )
  }


  /**
   * Método de servicio para obtener los pagos
   */
  public getAllPagosService = () =>{
    return this.http.get(`${BASE_URL}/pagos`, this.httpOptions).pipe(
      map( resp =>resp )
    )

  }



  /**
   * Método de servicio para obtener los pagos por ID
   * @param idCredito => ID del crédito
   */
  public getPagosByIdService = (idCredito:any) =>{

    return this.http.get(`${BASE_URL}/pagos/${idCredito}`, this.httpOptions).pipe(
      map( resp =>resp )
    )

  }


  /**
   * Método de servicio para actualizar el pago
   * @param formData => Datos del formulario
   * @param idPago => ID del pago
   */
  public updatePagosService = (formData:any, idPago:any) =>{
    formData.idPago = idPago;
    formData.estado = formData.estado == true? 1 : 0;

    return this.http.put(`${BASE_URL}/updatePago`, formData, this.httpOptions).pipe(
      tap( resp => resp )
    )

  }


}

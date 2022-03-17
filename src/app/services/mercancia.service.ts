import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

const BASE_URL: String = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {

  public httpOptions:any = {};

  constructor(
              private http: HttpClient,
  ) {
    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'x-token': localStorage.getItem('token')}) };
  }



  /**
   * Método de servicio para ingresar mercancía
   * @param formData => Datos del formulario
   */
  public insertMercanciaService = (formData: any) =>{
    
    return this.http.post(`${BASE_URL}/insertMercancia`, formData, this.httpOptions).pipe( tap( resp => resp ) );

  }





    
}

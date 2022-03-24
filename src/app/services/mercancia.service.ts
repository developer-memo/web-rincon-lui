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



  /**
   * Método GET de servicio para obtener toda la mercancia
   */
  public getAllMercanciaService = () =>{
    return this.http.get(`${BASE_URL}/allMercancia`, this.httpOptions).pipe( map( resp => resp ) );
  }


  /**
   * Método GET de servicio para obtener toda la mercancia por id
   */
  public getMercaByIdService = (id:string) => {
    return this.http.get(`${BASE_URL}/mercanciaById/${id}`, this.httpOptions).pipe( map( resp => resp ) );
  }


  /**
   * Método PUT de servicio para actualizar mercancía por ID
   */
  public putMercaByIdService = (dataForm:any) =>{
    return this.http.put(`${BASE_URL}/updateMercancia`, dataForm, this.httpOptions).pipe( tap( resp => resp ));
  }


 

    
}

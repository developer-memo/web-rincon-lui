import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';

import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ClienteForm } from '../interfaces/cliente.form.interface';

const BASE_URL: String = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public httpOptions:any = {}; 
  public timeElapsed = Date.now();
  public today = new Date(this.timeElapsed);
  public usuario:any[] = [];

  constructor( 
              private http: HttpClient,
              private router: Router
               ) {

    this.httpOptions = { headers: new HttpHeaders({ 'Content-Type':  'application/json', 'x-token': localStorage.getItem('token')}) };

   }


  /**
   * Método de servicio para crear usuarios
   * @param formData => Información del formulario
   */
  public crearUsuarioServices = ( formData: ClienteForm ) =>{  

    const json = {
      nombre: formData.nombre,
      email: formData.email,
      password: '12345',
      telefono: formData.telefono,
      direccion: formData.direccion,
      genero: formData.genero
    }
    
    return this.http.post(`${BASE_URL}/insertUsuario`, json, this.httpOptions).pipe(
      tap( (resp: any) => {})
    );

  }



  /**
   * Método de servicio para obtener todo los clientes
   */
  public getClientesService = () =>{
    return this.http.get(`${BASE_URL}/usuarios`, this.httpOptions).pipe(
      map( resp => resp)
    )
  }


  /**
   * Método de servicio para actualizar el cliente
   * @param formData => Datos del formulario
   * @param idUs => ID del cliente a actualizar
   */
  public updateClienteService = (formData:ClienteForm, idUs:any) =>{
    const json = {
      idUs,
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      direccion: formData.direccion,
      estado: formData.estado == true? 1 : 2
    }
    return this.http.put(`${BASE_URL}/updateCliente`, json, this.httpOptions ).pipe(
      tap( resp => resp )
    )
  }



  /**
   * Método de servicio para eliminar usuario por ID
   */
  public deleteUserService = (id:any) =>{
    return this.http.delete(`${BASE_URL}/deleteUser/${id}`, this.httpOptions).pipe( tap( resp => resp ));
  }

  

  
}

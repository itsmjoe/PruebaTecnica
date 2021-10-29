import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from '../URL';
@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {

  URL = URL_API;
  constructor(private http: HttpClient) {  }

  headers : HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  public listUsuario():Observable<any>{
    return this.http.post(`${this.URL}/listUsuario`,{});
  }
  public addUsuario(nombre:string,apellido:string,nickname:string,correo:string,contrasenia:string,telefono:string):Observable<any>{
    return this.http.post(`${this.URL}/addUsuario`,{nombre,apellido,nickname,correo,contrasenia,telefono});
  }
  public sesion(correo:string,contrasenia:string):Observable<any>{
    return this.http.post(`${this.URL}/sesion`,{correo,contrasenia});
  }
  public infoUsuario(correo:string,contrasenia:string):Observable<any>{
    return this.http.post(`${this.URL}/infoUsuario`,{correo,contrasenia});
  }

  public deleteUsuario(id:number):Observable<any>{
    return this.http.post(`${this.URL}/deleteUsuario`,{id});
  }

  public editUsuario(id:number,nombre:string,apellido:string,nickname:string,correo:string,contrasenia:string,telefono:string):Observable<any>{
    return this.http.post(`${this.URL}/editUsuario`,{id,nombre,apellido,nickname,correo,contrasenia,telefono});
  }

}

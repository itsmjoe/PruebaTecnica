import { Component, OnInit } from '@angular/core';
import { UsuarioServiceService } from 'src/app/servicios/usuario-service.service';
import { Usuario } from 'src/app/modelos/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  registro=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
    password2:new FormControl(''),
    nombre:new FormControl(''),
    apellido:new FormControl(''),
    telefono:new FormControl(''),
  });
  constructor(private userService:UsuarioServiceService, private router:Router) { }

  ngOnInit(): void {
    
    let iduser = localStorage.getItem('idUsuario');
    let correou = JSON.parse(localStorage.getItem('correoU')||'');
    console.log(correou);
    let usuario={
      id:0,
    nombre:"string",
    apellido:"string",
    nickname:"string",
    correo:"string",
    contrasenia:"string",
    telefono:"string",
    }
    let user1:Usuario=usuario;
    this.userService.infoUsuario(correou ,"").subscribe(
      res => {
        if(res.msj == 'error'){
          console.log('Error al obtener info usaurio');
          //Swal.fire('Error '+this.usuario.nombre)
        }
        else{
         // console.log(JSON.stringify(res));
          user1=JSON.parse(JSON.stringify(res));
          usuario=JSON.parse(JSON.stringify(res));
          user1=user1;
          console.log(user1);
          this.registro.setValue({
            email:user1.correo,
            password:user1.contrasenia,
            password2:user1.contrasenia,
            nombre:user1.nombre,
            apellido:user1.apellido,
            telefono:user1.telefono,
          });
        }
        return true;
      },
      err => {
        //console.log(err);
        console.log(err.respuesta)
        return false;
      }
    );
    console.log(user1);
    
    //let carpActiva = JSON.parse(carpetaActiva);
  }
  Registrar(){
    console.log('form->',this.registro.value);
    const {email,password,password2,nombre,apellido,telefono} = this.registro.value;
    this.userService.addUsuario(nombre,apellido,"",email,password,telefono).subscribe(
      res => {
        if(res.msj == 'error'){
          console.log('Error al crear usuario.');
          //Swal.fire('Error '+this.usuario.nombre)
        }
        else{
          console.log(JSON.stringify(res));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado exitosamente.',
            showConfirmButton: false,
            timer: 1500
          });
        }
        return true;
      },
      err => {
        //console.log(err);
        console.log(err.respuesta)
        return false;
      }
    );
    this.router.navigate(['/login']);
    console.log("cosas:"+nombre);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/servicios/usuario-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sesion=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  });
  constructor(private userService:UsuarioServiceService, private router:Router) { }

  ngOnInit(): void {
  }

  Iniciar(){
    //console.log('form->',this.sesion.value);
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

    const {email,password} = this.sesion.value;
    this.userService.infoUsuario(email,password).subscribe(
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
    console.log(usuario);
    this.userService.sesion(email,password).subscribe(
      res => {
        if(res.msj == 'error'){
          console.log('Error al iniciar sesion  de usuario.');
          //Swal.fire('Error '+this.usuario.nombre)
        }
        else{
          //console.log(JSON.stringify(res));
          Swal.fire({
            title: 'Bienvenido '+user1.nombre+' '+user1.apellido,
            width: 600,
            padding: '4em',
            timer: 3000,
            background: '#33C6FF url(https://sweetalert2.github.io/images/trees.png)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              center top
              no-repeat
            `
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
    this.router.navigate(['/mostrar']);
  }
}

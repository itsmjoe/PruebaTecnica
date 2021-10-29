import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { UsuarioServiceService } from 'src/app/servicios/usuario-service.service';
import { Usuario } from 'src/app/modelos/usuario';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
//import Swal from 'sweetalert2/dist/sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  //public usuario:Usuario;
  //public usuarios:Array<Usuario>;
  registro=new FormGroup({
    email:new FormControl(''),
    password:new FormControl(''),
    password2:new FormControl(''),
    nombre:new FormControl(''),
    apellido:new FormControl(''),
    telefono:new FormControl(''),
  });
  constructor(private userService:UsuarioServiceService, private router:Router) {
    let usuarioActivo = localStorage.getItem('usuarioActivo');
     //this.usuario=JSON.parse("");
     
   }

  ngOnInit(): void {
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

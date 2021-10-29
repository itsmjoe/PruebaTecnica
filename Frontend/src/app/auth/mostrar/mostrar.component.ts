import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioServiceService } from 'src/app/servicios/usuario-service.service';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.scss']
})
export class MostrarComponent implements OnInit {
  public usuarios:Array<Usuario>;
  constructor(private userService:UsuarioServiceService, private router:Router) { 
    this.usuarios=[];
  }

  ngOnInit(): void {
    this.ObtenerUsuarios();
  }

  ObtenerUsuarios():void{
    this.userService.listUsuario().subscribe(
      res => {
        if(res.msj == 'error'){
          console.log('Error al obtener info usaurio');
        }
        else{
          this.usuarios=JSON.parse(JSON.stringify(res));
         
          console.log(this.usuarios);
        }
        return true;
      },
      err => {
        console.log(err.respuesta)
        return false;
      }
    );
  }

  Eliminar(id:number){
    console.log("usuario->",id);
    Swal.fire({
      title: '¿Desea eliminar este usuario?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      showLoaderOnConfirm: true,
      preConfirm: (nombrec) => {
        this.userService.deleteUsuario(id).subscribe(
          res => {
            if(res.msj == 'error'){
              console.log('Error al eliminar usuario.');
            }
            else{
              console.log(JSON.stringify(res));
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario eliminado exitosamente.',
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
      },
      allowOutsideClick: () => false
    });
    this.ObtenerUsuarios();
  }

  Editar(id:number,correo:string){
    localStorage.setItem('idUsuario',JSON.stringify(id));
    localStorage.setItem('correoU',JSON.stringify(correo));
    this.router.navigate(['/editar']);
  }
  Ver(id:number){
    this.router.navigate(['/editar']);
  }

}

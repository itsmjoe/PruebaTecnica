import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioModule) }, 
{
  path:'',
  redirectTo:'/inicio',
  pathMatch:'full'
},
{ path: 'login', 
loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) 
}, 
{ 
  path: 'registrar', 
  loadChildren: () => import('./auth/registrar/registrar.module').then(m => m.RegistrarModule) 
},
{ path: 'mostrar', loadChildren: () => import('./auth/mostrar/mostrar.module').then(m => m.MostrarModule) },
{ path: 'editar', loadChildren: () => import('./auth/editar/editar.module').then(m => m.EditarModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

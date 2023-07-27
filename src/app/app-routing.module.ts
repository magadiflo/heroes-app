import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

import { canMatchHeroesGuard } from './auth/guards/heroes.guard';
import { canMatchAuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canMatch: [canMatchAuthGuard],
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canMatch: [canMatchHeroesGuard],
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  { path: '', redirectTo: 'heroes', pathMatch: 'full', }, //www.my-web-site.com/ <--- '', pero debo ponerle el pathMatch='full' ya que por defecto todas las rutas tienen un string vacío al inicio
  { path: '**', redirectTo: '404', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

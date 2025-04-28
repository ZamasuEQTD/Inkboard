import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home/home-page.component';
import { HiloPageComponent } from './features/hilos/pages/hilo/hilo-page.component';

export const routes: Routes = [
    {
      path: '' ,
      component: HomePageComponent
    },
    {
      path: 'hilo/:id',
      component: HiloPageComponent
    },
    {
      path:'**',
      redirectTo: ''
    }
  ];
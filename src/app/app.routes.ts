import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./listado-de-publicaciones/listado-de-publicaciones.component').then((m) => m.ListadoDePublicacionesComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'gestionpublicacion',
    loadComponent: () => import('./agregar-publicacion/agregar-publicacion.component').then( m => m.AgregarPublicacionComponent)
  },
  {
    path: 'modalDelete',
    loadComponent: () => import('./modalEliminar/modal-eliminar.page').then( m => m.ModalEliminar)
  },
];

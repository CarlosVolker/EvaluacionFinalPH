import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';
import { trashOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { PublicacionesListService } from '../servicios/publicaciones-list.service';
import { Publicacion } from '../modelo/publicacion';
import { ModalController } from '@ionic/angular/standalone';
import { ModalEliminar } from '../modalEliminar/modal-eliminar.page';

@Component({
  selector: 'app-listado-de-publicaciones',
  templateUrl: './listado-de-publicaciones.component.html',
  styleUrls: ['./listado-de-publicaciones.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})

export class ListadoDePublicacionesComponent  implements OnInit {
    
  publicaciones: Publicacion[] = [];

  constructor(
    private dataservicio: PublicacionesListService,
    private modalController: ModalController,
    private router: Router
    ) 
  {
    addIcons({addCircle, trashOutline})
  }

  async ngOnInit() {
    await this.dataservicio.getPublicacion();
    await this._actualizar();
  }

  async _actualizar() {
    this.publicaciones = await this.dataservicio.getPublicacion();
  }
  
  async eliminarPublicacion(id: number): Promise<void> {
    if (id !== undefined) {

      const modal = await this.modalController.create({
        component: ModalEliminar,
      });
      await modal.present();

      modal.onDidDismiss().then(async (result) => {
        if (result.data === true) {
          console.log('ID a eliminar:', id);
           this.dataservicio.eliminarPublicacion(id);
           this._actualizar();
        } else {
          console.log('Eliminación cancelada.');
        }
      });

      this.ngOnInit();
    } else {
      console.error('No se puede eliminar.');
    }
    this._actualizar()
  }

  agregarPublicacion() {
    this._actualizar()
    this.router.navigate(['gestionpublicacion']);
  }

}
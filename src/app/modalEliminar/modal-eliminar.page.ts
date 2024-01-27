import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular/standalone';
import { ListadoDePublicacionesComponent } from '../listado-de-publicaciones/listado-de-publicaciones.component';

@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.page.html',
  styleUrls: ['./modal-eliminar.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ModalEliminar implements OnInit {
  

  
  constructor(private modalController: ModalController) {}

  ngOnInit() {

  }

  confirmarEliminacion(confirmado: boolean) {
    
    this.modalController.dismiss(confirmado);
  }

}

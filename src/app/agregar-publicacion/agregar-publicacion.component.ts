import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { PublicacionesListService } from '../servicios/publicaciones-list.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons'; 
import { cameraOutline } from 'ionicons/icons';
import { saveOutline } from 'ionicons/icons';
import { Publicacion } from '../modelo/publicacion';

@Component({
  selector: 'app-agregar-publicacion',
  templateUrl: './agregar-publicacion.component.html',
  styleUrls: ['./agregar-publicacion.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AgregarPublicacionComponent  implements OnInit {

  //contadorIds: number = 0;
  fechaActual: Date;
  DatoImagen: Photo | null = null;
  listaPublicacion: Publicacion[] = [];
  nuevaPublicacion: Publicacion = {
    id: 0,
    titulo: '',
    descripcion: '',
    imagen: "",
  };



  constructor(
    private dataservicio: PublicacionesListService,
    private router: Router
  ) {
    this.fechaActual = new Date();
    addIcons({ arrowBackOutline, cameraOutline, saveOutline});
  }

  async ngOnInit() {
    await this.dataservicio.getPublicacion();
    await this._actualizar();
    
  }

  async _actualizar() {
    this.listaPublicacion = await this.dataservicio.getPublicacion();
    
    this.ultimoID();
    console.log('Lista actualizada:', this.listaPublicacion);
  }

  async agregarPublicacion() {
    
    if (this.formularioValido()) {
      //this.nuevaPublicacion.id = await this.ultimoID();
     

      await this.dataservicio.guardarPublicacion(this.nuevaPublicacion);
      await this._actualizar();

      this.nuevaPublicacion = {
        id: 0,
        titulo: '',
        descripcion: '',
        imagen: '',
      };
   
    }
  }

  async ultimoID(){
    const ultimoId = await this.dataservicio.getUltimoId() +1
    console.log("llama ultimo ID",ultimoId);
    //return ultimoId
    this.nuevaPublicacion.id = ultimoId
  }

  async tomaImg() {
    this.DatoImagen = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: true,
      correctOrientation: true,
    });

    if(this.nuevaPublicacion){
      this.nuevaPublicacion.imagen = this.DatoImagen.webPath
    }
  }

  formularioValido(): boolean {
    return (
      this.nuevaPublicacion.titulo?.length >= 5 &&
      this.nuevaPublicacion.descripcion?.length >= 20
            );
      }

  paginaPrincipal() {
    this.router.navigate(['home']);
  } 
}
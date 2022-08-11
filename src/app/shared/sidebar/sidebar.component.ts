import { Component } from '@angular/core';

import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  // Getter que obtiene el historial del servicio.
  get historial() {
    return this.gifsService.historial;
  }

  // Inyecta el servicio en el componente.
  constructor(private gifsService: GifsService) { }

  // Método para obtener los gifs en el servicio (Historial).
  buscar(palabra: string){
    this.gifsService.buscarGifs(palabra);
  }
}

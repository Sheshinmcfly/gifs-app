import { Component } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html'
})
export class ResultadosComponent {

  // Getter que obtiene los resultados del servicio.
  get resultados(){
    return this.gifsService.resultados;
  }

  // Inyecta el servicio en el componente.
  constructor(private gifsService: GifsService) { }
}

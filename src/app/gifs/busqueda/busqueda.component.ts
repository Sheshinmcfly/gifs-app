import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  // Obtiene el valor del elemento del DOM por referencia (En el DOM: #txtBuscar).
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  // Inyecta el servicio en el componente.
  constructor(private gifsService: GifsService){}

  // Método para buscar un gif.
  buscar() {

    // Se asigna a variable el elemento del Dom obtenido previamente;
    let valor = this.txtBuscar.nativeElement;

    // Valida si el valor.value contiene un valor vacío;
    if (valor.value.trim().length === 0) {
      return;
    }

    // Ejecuta el método desde el servicio para buscar el gif.
    this.gifsService.buscarGifs(valor.value);

    // Limpia el valor del input.
    valor.value = '';
  }
}

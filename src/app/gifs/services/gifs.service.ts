import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _apiKey: string = 'm2cRcpY7htaAeYxLFhPVWDrrY2ldGVOE';
  private _limiteContenido: string = '20';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  // Getter que obtiene el historial de búsquedas.
  get historial() {
    return [...this._historial];
  }

  // Inyecta la clase HttpClient para consumir la api.
  constructor(private http: HttpClient) {

    // Valida si el historial y los resultados del localStorage existen.
    if (localStorage.getItem('historial') && localStorage.getItem('resultados')) {

      this._historial = JSON.parse(localStorage.getItem('historial')!);
      this.resultados = JSON.parse(localStorage.getItem('resultados')!);
    }
  }


  // Método que busca gifs a partir del parámetro recibido.
  buscarGifs(palabra: string = '') {

    // Transforma la palabra en minúscula y quita los espacios atrás y adelante.
    palabra = palabra.trim().toLowerCase();

    // Valida si la palabra no está incluída en el historial.
    if (!this._historial.includes(palabra)) {

      // Inserta en el historial la palabra en la primera posición.
      this._historial.unshift(palabra);

      // Acorta el historial a un número de 10 elementos.
      this._historial = this._historial.splice(0, 10);

      // Setea el historial transformado en Json, en el localStorage.
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // Crea los parámetros que tendrá el endpoint de la api a consumir.
    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', this._limiteContenido)
      .set('q', palabra);

    // Obtiene a través del método get, la respuesta que se recibe a través del endpoint con sus parámetros.
    this.http.get<SearchGifsResponse>(`${this._servicioUrl}/search`, { params })
      .subscribe((resp: SearchGifsResponse) => {

        // Se asignan los resultados obtenidos al array.
        this.resultados = resp.data;

        // Setea los resultados transformados en Json, en el localStorage.
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {

  private _mensajeState = signal<string>('Mensaje por defecto');

  public mensaje = this._mensajeState.asReadonly();

  // este constructor vacío permite que este servicio pueda ser utilizado (inyectable) en otros componentes
  constructor() { }

  // Funcion(es) para acceder a la señal
  public actualizarMensaje(nuevoMensaje: string): void {
    this._mensajeState.set(nuevoMensaje);
  }

}

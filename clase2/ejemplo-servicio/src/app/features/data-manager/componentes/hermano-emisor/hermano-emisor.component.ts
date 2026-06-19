import { Component, inject } from '@angular/core';
import { DataSharedService } from '../../services/data-shared.service';


@Component({
  selector: 'app-hermano-emisor',
  imports: [],
  templateUrl: './hermano-emisor.component.html'
})
export class HermanoEmisorComponent {
  public dataService = inject(DataSharedService);

  public enviarDatos(nuevoValor: string): void {
    if(nuevoValor.trim()){
      this.dataService.actualizarMensaje(nuevoValor);
    }
  }


}

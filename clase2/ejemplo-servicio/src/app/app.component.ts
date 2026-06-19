import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HermanoEmisorComponent} from "./features/data-manager/componentes/hermano-emisor/hermano-emisor.component";
import {HermanoReceptorComponent} from "./features/data-manager/componentes/hermano-receptor/hermano-receptor.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HermanoEmisorComponent, HermanoReceptorComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'ejemplo-servicio';
}

import { Component, inject } from '@angular/core';
import { DataSharedService } from '../../services/data-shared.service';

@Component({
  selector: 'app-hermano-receptor',
  imports: [],
  templateUrl: './hermano-receptor.component.html'
})
export class HermanoReceptorComponent {
  public dataService = inject(DataSharedService);
}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Provider} from './provider.model';
import {ProviderService} from './provider.service';

@Component({
  selector: 'app-providers-dropdown',
  templateUrl: './providers-dropdown.component.html'
})
export class ProvidersDropdownComponent {

  @Input() providerIn = '';
  @Output() providerOut = new EventEmitter<any>();
  providers: Provider[];

  constructor(private providerService: ProviderService) {
    this.providerService.readAll().subscribe(
      data => this.providers = data
    );
  }

  onSelect(provider) {
    this.providerOut.emit(provider);
  }
}

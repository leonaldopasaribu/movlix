import { Component, EventEmitter, Output } from '@angular/core';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
    selector: 'app-success-favorite-dialog',
    templateUrl: './success-favorite-dialog.component.html',
    imports: [DialogComponent]
})
export class SuccessFavoriteDialogComponent {
  @Output()
  closeClicked: EventEmitter<void>;

  constructor() {
    this.closeClicked = new EventEmitter();
  }

  onCloseClick(): void {
    this.closeClicked.emit();
  }
}

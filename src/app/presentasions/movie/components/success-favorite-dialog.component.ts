import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-success-favorite-dialog',
  templateUrl: './success-favorite-dialog.component.html',
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

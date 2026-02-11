import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  @Output()
  closeClicked;

  constructor() {
    this.closeClicked = new EventEmitter();
  }

  onCloseClick(): void {
    this.closeClicked.emit();
  }

  onBackdropClick(): void {
    this.closeClicked.emit();
  }
}

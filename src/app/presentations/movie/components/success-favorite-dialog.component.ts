import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-success-favorite-dialog',
  templateUrl: './success-favorite-dialog.component.html',
  imports: [DialogComponent],
})
export class SuccessFavoriteDialogComponent {
  private dialogRef = inject(DialogRef);

  onCloseClick(): void {
    this.dialogRef.close();
  }
}

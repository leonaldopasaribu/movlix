import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogComponent } from './dialog.component';

@NgModule({
  imports: [CommonModule, DialogComponent],
  exports: [DialogComponent],
})
export class DialogModule {}

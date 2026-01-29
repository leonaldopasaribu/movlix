import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogComponent } from './dialog.component';

@NgModule({
  imports: [CommonModule, DialogComponent],
  exports: [DialogComponent],
})
export class DialogModule {}

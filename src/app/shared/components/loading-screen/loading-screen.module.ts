import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoadingScreenComponent } from './loading-screen.component';

@NgModule({
  imports: [CommonModule, LoadingScreenComponent],
  exports: [LoadingScreenComponent],
})
export class LoadingScreenModule {}

import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { CardComponent } from './card.component';

@NgModule({
  imports: [CommonModule, NgOptimizedImage, CardComponent],
  exports: [CardComponent],
})
export class CardModule {}

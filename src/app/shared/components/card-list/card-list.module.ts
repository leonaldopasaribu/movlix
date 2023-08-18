import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardListComponent } from './card-list.component';

import { CardModule } from '../card';

@NgModule({
  declarations: [CardListComponent],
  imports: [CommonModule, CardModule],
  exports: [CardListComponent],
})
export class CardListModule {}

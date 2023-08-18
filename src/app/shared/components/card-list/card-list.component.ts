import { Component, Input } from '@angular/core';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  @Input()
  contents: MovieEntity[];

  constructor() {
    this.contents = [];
  }

  trackByIndex(index: number): number {
    return index;
  }
}

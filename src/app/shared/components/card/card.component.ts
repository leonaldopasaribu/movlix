import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input()
  rating: number;

  @Input()
  posterUrl: string;

  @Input()
  title: string;

  constructor() {
    this.rating = 0;
    this.posterUrl = '';
    this.title = '';
  }
}

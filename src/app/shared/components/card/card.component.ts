import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input()
  hasRating: boolean;

  @Input()
  hasFavorite: boolean;

  @Input()
  rating: number;

  @Input()
  imageUrl: string;

  @Input()
  title: string;

  @Output()
  clicked: EventEmitter<void>;

  constructor() {
    this.hasRating = false;
    this.hasFavorite = false;
    this.rating = 0;
    this.imageUrl = '';
    this.title = '';

    this.clicked = new EventEmitter();
  }

  onCardClick(): void {
    this.clicked.emit();
  }
}

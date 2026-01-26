import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    imports: [NgOptimizedImage]
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

  @Output()
  favoriteClicked: EventEmitter<void>;

  constructor() {
    this.hasRating = false;
    this.hasFavorite = false;
    this.rating = 0;
    this.imageUrl = '';
    this.title = '';

    this.clicked = new EventEmitter();
    this.favoriteClicked = new EventEmitter();
  }

  onCardClick(): void {
    this.clicked.emit();
  }

  onFavoriteIconClick(): void {
    this.favoriteClicked.emit();
  }
}

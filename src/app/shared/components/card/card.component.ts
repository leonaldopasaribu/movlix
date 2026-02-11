import { DecimalPipe, NgOptimizedImage } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [NgOptimizedImage, DecimalPipe],
})
export class CardComponent {
  hasRating = input(false);
  hasFavorite = input(false);
  rating = input(0);
  imageUrl = input('');
  title = input('');

  clicked = output<void>();
  favoriteClicked = output<void>();

  onCardClick(): void {
    this.clicked.emit();
  }

  onFavoriteIconClick(event: Event): void {
    event.stopPropagation();
    this.favoriteClicked.emit();
  }
}

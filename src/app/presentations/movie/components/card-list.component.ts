import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';

import { CardComponent } from '../../../shared/components/card/card.component';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

import { MOVIE_URL } from 'src/app/shared/const/route-url.const';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  imports: [CardComponent],
})
export class CardListComponent {
  private readonly router = inject(Router);

  contents = input<MovieEntity[]>([]);
  hasIconLove = input(false);

  favoriteClicked = output<MovieEntity>();

  onCardClick(movieId: number): void {
    this.router.navigateByUrl(`${MOVIE_URL}/${movieId}`);
  }

  onFavoriteIconClick(movie: MovieEntity): void {
    this.favoriteClicked.emit(movie);
  }
}

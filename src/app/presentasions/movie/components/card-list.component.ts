import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

import { MOVIE_URL } from 'src/app/shared/const/route-url.const';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  imports: [CardComponent],
})
export class CardListComponent {
  private router = inject(Router);

  @Input()
  contents: MovieEntity[];

  @Input()
  hasIconLove: boolean;

  @Output()
  favoriteClicked: EventEmitter<MovieEntity>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.contents = [];
    this.hasIconLove = false;

    this.favoriteClicked = new EventEmitter();
  }

  trackByIndex(index: number): number {
    return index;
  }

  onCardClick(movieId: number): void {
    this.redirectToMovieDetails(movieId);
  }

  onFavoriteIconClick(movie: MovieEntity): void {
    this.favoriteClicked.emit(movie);
  }

  private redirectToMovieDetails(movieId: number): void {
    this.router.navigateByUrl(`${MOVIE_URL}/${movieId.toString()}`);
  }
}

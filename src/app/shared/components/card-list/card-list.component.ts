import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { MOVIE_URL } from '../../const/route-url.const';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  @Input()
  contents: MovieEntity[];

  @Output()
  clicked: EventEmitter<void>;

  constructor(private router: Router) {
    this.contents = [];

    this.clicked = new EventEmitter();
  }

  trackByIndex(index: number): number {
    return index;
  }

  onCardClick(movieId: number): void {
    this.redirectToMovieDetails(movieId);
  }

  private redirectToMovieDetails(movieId: number): void {
    this.router.navigateByUrl(`${MOVIE_URL}/${movieId.toString()}`);
  }
}

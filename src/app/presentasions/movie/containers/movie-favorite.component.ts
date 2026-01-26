import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieFavoriteViewModel } from '../view-models/movie-favorite.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Component({
    templateUrl: './movie-favorite.component.html',
    standalone: false
})
export class MovieFavoriteComponent implements OnInit {
  private viewModel = inject(MovieFavoriteViewModel);

  isLoading$: Observable<boolean>;

  favoriteMovies$: Observable<MovieEntity[] | null>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.isLoading$ = this.viewModel.isLoading$;

    this.favoriteMovies$ = this.viewModel.favoriteMovies$;
  }

  ngOnInit(): void {
    this.viewModel.getFavoriteMovies();
  }

  trackByIndex(index: number): number {
    return index;
  }
}

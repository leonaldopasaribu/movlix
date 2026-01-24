import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieFavoriteViewModel } from '../view-models/movie-favorite.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Component({
    templateUrl: './movie-favorite.component.html',
    standalone: false
})
export class MovieFavoriteComponent implements OnInit {
  isLoading$: Observable<boolean>;

  favoriteMovies$: Observable<MovieEntity[] | null>;

  constructor(private viewModel: MovieFavoriteViewModel) {
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

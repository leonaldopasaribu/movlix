import { Injectable } from '@angular/core';

import { MovieFavoriteState } from '../states/movie-favorite.state';

import { Store } from 'src/app/shared/base/store';
import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Injectable()
export class MovieFavoriteStore extends Store<MovieFavoriteState> {
  constructor() {
    super(new MovieFavoriteState());
  }

  markAsLoading(): void {
    this.setState({ isLoading: true });
  }

  markAsError(message: string): void {
    this.setState({ isError: true, isLoading: false, errorMessage: message });
  }

  saveFavoriteMovies(favoriteMovies: MovieEntity[] | null): void {
    this.setState({ isLoading: false, favoriteMovies });
  }
}

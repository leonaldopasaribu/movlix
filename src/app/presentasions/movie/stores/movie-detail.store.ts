import { Injectable } from '@angular/core';

import { MovieDetailState } from '../states/movie-detail.state';

import { Store } from 'src/app/shared/base/store';
import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Injectable()
export class MovieDetailStore extends Store<MovieDetailState> {
  constructor() {
    super(new MovieDetailState());
  }

  markAsLoading(): void {
    this.setState({ isLoading: true });
  }

  markAsError(message: string): void {
    this.setState({ isError: true, isLoading: false, errorMessage: message });
  }

  saveMovieDetails(movie: MovieEntity): void {
    this.setState({ isLoading: false, movie });
  }
}

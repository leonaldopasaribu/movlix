import { Injectable } from '@angular/core';

import { MovieState } from '../states/movie.state';
import { Movie } from '../models/movie.model';

import { Store } from 'src/app/shared/base/store';

@Injectable()
export class MovieStore extends Store<MovieState> {
  constructor() {
    super(new MovieState());
  }

  markAsLoading(): void {
    this.setState({ isLoading: true });
  }

  markAsError(message: string): void {
    this.setState({ isError: true, isLoading: false, errorMessage: message });
  }

  populateMovies(movies: Movie): void {
    this.setState({ isLoading: false, ...movies });
  }

  openSuccessFavoriteDialog(): void {
    this.setState({ isShowSuccessFavoriteDialog: true });
  }

  closeSuccessFavoriteDialog(): void {
    this.setState({ isShowSuccessFavoriteDialog: false });
  }
}

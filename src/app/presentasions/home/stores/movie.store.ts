import { Injectable } from '@angular/core';

import { MovieState } from '../states/movie.state';

import { Store } from 'src/app/shared/base/store';
import { MovieEntity } from 'src/app/core/entities/movie.entity';

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

  populateMovies(movies: {
    nowPlayingMovies: MovieEntity[];
    popularMovies: MovieEntity[];
    topRatedMovies: MovieEntity[];
    upComingMovies: MovieEntity[];
  }): void {
    this.setState({ isLoading: false, ...movies });
  }

  saveMovieDetails(movie: MovieEntity): void {
    this.setState({ isLoading: false, ...movie });
  }
}

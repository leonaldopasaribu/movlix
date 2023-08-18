import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieViewModel } from '../view-models/movie.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Component({
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit {
  isLoading$: Observable<boolean>;

  nowPlayingMovies$: Observable<MovieEntity[]>;
  popularMovies$: Observable<MovieEntity[]>;
  topRatedMovies$: Observable<MovieEntity[]>;
  upComingMovies$: Observable<MovieEntity[]>;

  constructor(private viewModel: MovieViewModel) {
    this.isLoading$ = this.viewModel.isLoading$;

    this.nowPlayingMovies$ = this.viewModel.nowPlayingMovies$;
    this.popularMovies$ = this.viewModel.popularMovies$;
    this.topRatedMovies$ = this.viewModel.topRatedMovies$;
    this.upComingMovies$ = this.viewModel.upComingMovies$;
  }

  ngOnInit(): void {
    this.viewModel.fetchMovies();
  }

  onCardClick(movieId: number): void {
    this.viewModel.redirectToMovieDetails(movieId);
  }
}

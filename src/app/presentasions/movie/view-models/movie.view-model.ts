import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';

import { MovieStore } from '../stores/movie.store';
import { Movie } from '../models/movie.model';

import { MovieRepository } from 'src/app/core/repositories/movie.repositories';
import { MovieType } from 'src/app/core/entities/movie-type.enum';
import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { MOVIE_URL } from 'src/app/shared/const/route-url.const';

@Injectable()
export class MovieViewModel {
  constructor(
    private store: MovieStore,
    private movieRepository: MovieRepository,
    private router: Router,
  ) {}

  get isLoading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.isLoading));
  }

  get nowPlayingMovies$(): Observable<MovieEntity[]> {
    return this.store.state$.pipe(map(state => state.nowPlayingMovies));
  }

  get popularMovies$(): Observable<MovieEntity[]> {
    return this.store.state$.pipe(map(state => state.popularMovies));
  }

  get topRatedMovies$(): Observable<MovieEntity[]> {
    return this.store.state$.pipe(map(state => state.topRatedMovies));
  }

  get upComingMovies$(): Observable<MovieEntity[]> {
    return this.store.state$.pipe(map(state => state.upComingMovies));
  }

  fetchMovies(): void {
    const nowPlayingMovieType = MovieType.NowPlaying;
    const popularMovieType = MovieType.Popular;
    const topRatedMovieType = MovieType.TopRated;
    const upComingMovieType = MovieType.UpComing;

    this.activateLoading();

    forkJoin({
      nowPlayingMovies: this.movieRepository.fetchAll(nowPlayingMovieType),
      popularMovies: this.movieRepository.fetchAll(popularMovieType),
      topRatedMovies: this.movieRepository.fetchAll(topRatedMovieType),
      upComingMovies: this.movieRepository.fetchAll(upComingMovieType),
    }).subscribe({
      next: (values: Movie) => {
        this.handleSuccessFetchMovies(values);
      },
      error: (error: HttpErrorResponse) => {
        this.handleErrorFetchMovies(error);
      },
    });
  }

  redirectToMovieDetails(movieId: number): void {
    this.router.navigateByUrl(`${MOVIE_URL}/${movieId.toString()}`);
  }

  private activateLoading(): void {
    this.store.markAsLoading();
  }

  private handleSuccessFetchMovies(movies: Movie): void {
    this.store.populateMovies(movies);
  }

  private handleErrorFetchMovies(error: HttpErrorResponse): void {
    const { message } = error;

    this.store.markAsError(message);
  }
}

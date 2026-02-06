import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { distinctUntilChanged, forkJoin, map, Observable } from 'rxjs';

import { MovieDetailStore } from '../stores/movie-detail.store';

import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { MovieRepository } from 'src/app/core/repositories/movie.repositories';

@Injectable()
export class MovieDetailViewModel {
  private store = inject(MovieDetailStore);
  private movieRepository = inject(MovieRepository);
  private location = inject(Location);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  get isLoading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.isLoading));
  }

  get movie$(): Observable<MovieEntity> {
    return this.store.state$.pipe(
      map(state => state.movie),
      distinctUntilChanged(),
    );
  }

  fetchMovieDetails(movieId: number): void {
    this.activateLoading();

    forkJoin({
      movie: this.movieRepository.fetchOneById(movieId),
      trailerUrl: this.movieRepository.fetchVideos(movieId),
    }).subscribe({
      next: ({ movie, trailerUrl }) => {
        const movieWithTrailer = { ...movie, trailerUrl };
        this.handleSuccessFetchMovieDetails(movieWithTrailer);
      },
      error: (error: HttpErrorResponse) => {
        this.handleErrorFetchMovieDetails(error);
      },
    });
  }

  onClickBackToPreviousPage(): void {
    this.location.back();
  }

  private activateLoading(): void {
    this.store.markAsLoading();
  }

  private handleSuccessFetchMovieDetails(movie: MovieEntity): void {
    this.store.saveMovieDetails(movie);
  }

  private handleErrorFetchMovieDetails(error: HttpErrorResponse): void {
    const { message } = error;

    this.store.markAsError(message);
  }
}

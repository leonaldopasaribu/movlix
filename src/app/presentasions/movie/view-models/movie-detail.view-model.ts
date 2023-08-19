import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { MovieDetailStore } from '../stores/movie-detail.store';

import { MovieRepository } from 'src/app/core/repositories/movie.repositories';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Injectable()
export class MovieDetailViewModel {
  constructor(
    private store: MovieDetailStore,
    private movieRepository: MovieRepository,
    private location: Location,
  ) {}

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

    this.movieRepository.fetchOneById(movieId).subscribe({
      next: value => {
        this.handleSuccessFetchMovieDetails(value);
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

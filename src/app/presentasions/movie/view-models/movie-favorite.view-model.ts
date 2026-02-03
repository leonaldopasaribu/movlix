import { inject, Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { MovieFavoriteStore } from '../stores/movie-favorite.store';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

import { LOCAL_STORAGE_FAVORITE_MOVIES_KEY } from 'src/app/shared/const/local-storage-key.const';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

@Injectable()
export class MovieFavoriteViewModel {
  private store = inject(MovieFavoriteStore);
  private localStorageService = inject(LocalStorageService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  get isLoading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.isLoading));
  }

  get favoriteMovies$(): Observable<MovieEntity[] | null> {
    return this.store.state$.pipe(
      map(state => state.favoriteMovies),
      distinctUntilChanged(),
    );
  }

  getFavoriteMovies(): void {
    const favoriteMovies = this.getFavoriteMoviesFromLocalStorage();

    this.activateLoading();

    this.store.saveFavoriteMovies(favoriteMovies);
  }

  removeFavoriteMovie(movie: MovieEntity): void {
    const favoriteMovies = this.getFavoriteMoviesFromLocalStorage() || [];

    const updatedFavorites = favoriteMovies.filter(
      favMovie => favMovie.id !== movie.id,
    );

    this.localStorageService.setItem(
      LOCAL_STORAGE_FAVORITE_MOVIES_KEY,
      updatedFavorites,
    );

    this.store.saveFavoriteMovies(updatedFavorites);
  }

  private activateLoading(): void {
    this.store.markAsLoading();
  }

  private getFavoriteMoviesFromLocalStorage(): MovieEntity[] | null {
    const localStorageFavoriteMoviesKey = LOCAL_STORAGE_FAVORITE_MOVIES_KEY;

    return this.localStorageService.getItem<MovieEntity[]>(
      localStorageFavoriteMoviesKey,
    );
  }
}

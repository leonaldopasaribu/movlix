import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable } from 'rxjs';

import { MovieFavoriteStore } from '../stores/movie-favorite.store';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';

import { LOCAL_STORAGE_FAVORITE_MOVIES_KEY } from 'src/app/shared/const/local-storage-key.const';

@Injectable()
export class MovieFavoriteViewModel {
  constructor(
    private store: MovieFavoriteStore,
    private localStorageService: LocalStorageService,
  ) {}

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

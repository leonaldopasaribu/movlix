import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieFavoriteViewModel } from '../view-models/movie-favorite.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CardListComponent } from '../components/card-list.component';
import { AsyncPipe } from '@angular/common';

@Component({
    templateUrl: './movie-favorite.component.html',
    imports: [LoadingScreenComponent, HeaderComponent, CardListComponent, AsyncPipe]
})
export class MovieFavoriteComponent implements OnInit {
  private viewModel = inject(MovieFavoriteViewModel);

  isLoading$: Observable<boolean>;

  favoriteMovies$: Observable<MovieEntity[] | null>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.isLoading$ = this.viewModel.isLoading$;

    this.favoriteMovies$ = this.viewModel.favoriteMovies$;
  }

  ngOnInit(): void {
    this.viewModel.getFavoriteMovies();
  }

  trackByIndex(index: number): number {
    return index;
  }
}

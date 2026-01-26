import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieViewModel } from '../view-models/movie.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { HeroComponent } from '../components/hero.component';
import { CardListComponent } from '../components/card-list.component';
import { SuccessFavoriteDialogComponent } from '../components/success-favorite-dialog.component';
import { AsyncPipe } from '@angular/common';

@Component({
    templateUrl: './movie.component.html',
    imports: [LoadingScreenComponent, HeaderComponent, HeroComponent, CardListComponent, SuccessFavoriteDialogComponent, AsyncPipe]
})
export class MovieComponent implements OnInit {
  private viewModel = inject(MovieViewModel);

  isLoading$: Observable<boolean>;
  isShowSuccessFavoriteDialog$: Observable<boolean>;

  nowPlayingMovies$: Observable<MovieEntity[]>;
  popularMovies$: Observable<MovieEntity[]>;
  topRatedMovies$: Observable<MovieEntity[]>;
  upComingMovies$: Observable<MovieEntity[]>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.isLoading$ = this.viewModel.isLoading$;
    this.isShowSuccessFavoriteDialog$ =
      this.viewModel.isShowSuccessFavoriteDialog$;

    this.nowPlayingMovies$ = this.viewModel.nowPlayingMovies$;
    this.popularMovies$ = this.viewModel.popularMovies$;
    this.topRatedMovies$ = this.viewModel.topRatedMovies$;
    this.upComingMovies$ = this.viewModel.upComingMovies$;
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  onCardClick(movieId: number): void {
    this.viewModel.redirectToMovieDetails(movieId);
  }

  onIconLoveClick(movie: MovieEntity): void {
    this.viewModel.addFavoriteMovie(movie);
  }

  onCloseSuccessFavoriteDialogClick(): void {
    this.viewModel.onClickCloseSuccessFavoriteDialog();
  }

  private loadInitialData(): void {
    this.viewModel.fetchMovies();
  }
}

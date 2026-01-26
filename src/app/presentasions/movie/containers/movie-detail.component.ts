import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieDetailViewModel } from '../view-models/movie-detail.view-model';
import { MOVIE_ID_QUERY_PARAM_NAME } from '../const/movie-detail.const';

import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { NgOptimizedImage, AsyncPipe, DecimalPipe } from '@angular/common';

@Component({
    templateUrl: './movie-detail.component.html',
    imports: [LoadingScreenComponent, HeaderComponent, NgOptimizedImage, AsyncPipe, DecimalPipe]
})
export class MovieDetailComponent implements OnInit {
  private viewModel = inject(MovieDetailViewModel);
  private activatedRoute = inject(ActivatedRoute);

  isLoading$: Observable<boolean>;

  movie$: Observable<MovieEntity>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.isLoading$ = this.viewModel.isLoading$;

    this.movie$ = this.viewModel.movie$;
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  trackByIndex(index: number): number {
    return index;
  }

  onButtonBackClick(): void {
    this.viewModel.onClickBackToPreviousPage();
  }

  private loadInitialData(): void {
    const movieId = this.activatedRoute.snapshot.paramMap.get(
      MOVIE_ID_QUERY_PARAM_NAME,
    );

    this.viewModel.fetchMovieDetails(Number(movieId));
  }
}

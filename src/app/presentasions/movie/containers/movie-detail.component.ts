import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieDetailViewModel } from '../view-models/movie-detail.view-model';
import { MOVIE_ID_QUERY_PARAM_NAME } from '../const/movie-detail.const';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Component({
    templateUrl: './movie-detail.component.html',
    standalone: false
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

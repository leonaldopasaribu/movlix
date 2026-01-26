import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { MovieDetailViewModel } from '../view-models/movie-detail.view-model';
import { MOVIE_ID_QUERY_PARAM_NAME } from '../const/movie-detail.const';
import {
  TrailerComponent,
  TrailerDialogData,
} from '../components/trailer.component';

import { MovieEntity } from 'src/app/core/entities/movie.entity';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { NgOptimizedImage, AsyncPipe, DecimalPipe } from '@angular/common';
import { SeoService } from '../../../shared/services/seo/seo.service';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './movie-detail.component.html',
  imports: [
    LoadingScreenComponent,
    HeaderComponent,
    NgOptimizedImage,
    AsyncPipe,
    DecimalPipe,
  ],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  private viewModel = inject(MovieDetailViewModel);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private seoService = inject(SeoService);
  private destroy$ = new Subject<void>();

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
    this.setupSeo();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByIndex(index: number): number {
    return index;
  }

  onButtonBackClick(): void {
    this.viewModel.onClickBackToPreviousPage();
  }

  onWatchTrailerClickFromMovie(movie: MovieEntity): void {
    if (movie.trailerUrl) {
      this.onWatchTrailerClick(movie.trailerUrl, movie.title);
    }
  }

  onWatchTrailerClick(trailerUrl: string, movieTitle: string): void {
    this.dialog.open<TrailerComponent, TrailerDialogData>(TrailerComponent, {
      data: { trailerUrl, movieTitle },
      width: '95vw',
      maxWidth: '1200px',
      panelClass: 'trailer-dialog',
      autoFocus: false,
      hasBackdrop: true,
      disableClose: false,
    });
  }

  private loadInitialData(): void {
    const movieId = this.activatedRoute.snapshot.paramMap.get(
      MOVIE_ID_QUERY_PARAM_NAME,
    );

    this.viewModel.fetchMovieDetails(Number(movieId));
  }

  private setupSeo(): void {
    this.movie$.pipe(takeUntil(this.destroy$)).subscribe(movie => {
      if (movie) {
        const movieUrl = `${environment.pageUrl}/movie/${movie.id}`;
        const genres = movie.genre.map(g => g.name).join(', ');

        this.seoService.updateMetaTags({
          title: `${movie.title} (${new Date(movie.releaseDate).getFullYear()}) - Movlix`,
          description:
            movie.overview ||
            `Watch ${movie.title} on Movlix. A ${genres} movie.`,
          image: movie.backdropUrl || movie.posterUrl,
          url: movieUrl,
          keywords: `${movie.title}, movie, watch online, ${genres}`,
          type: 'video.movie',
        });

        this.seoService.setCanonicalUrl(movieUrl);

        // JSON-LD Schema for Movie
        this.seoService.setJsonLd({
          '@context': 'https://schema.org',
          '@type': 'Movie',
          name: movie.title,
          description: movie.overview,
          image: movie.posterUrl,
          datePublished: movie.releaseDate,
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: movie.rating,
            bestRating: 10,
          },
          genre: movie.genre.map(g => g.name),
        });
      }
    });
  }
}

import { Dialog } from '@angular/cdk/dialog';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen.component';
import { SeoService } from '../../../shared/services/seo/seo.service';
import { CardListComponent } from '../components/card-list.component';
import { HeroComponent } from '../components/hero.component';
import { SuccessFavoriteDialogComponent } from '../components/success-favorite-dialog.component';
import { MovieViewModel } from '../view-models/movie.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Component({
  templateUrl: './movie.component.html',
  imports: [
    LoadingScreenComponent,
    HeaderComponent,
    HeroComponent,
    CardListComponent,
    AsyncPipe,
  ],
})
export class MovieComponent implements OnInit {
  private viewModel = inject(MovieViewModel);
  private seoService = inject(SeoService);
  private dialog = inject(Dialog);

  isLoading$: Observable<boolean>;

  nowPlayingMovies$: Observable<MovieEntity[]>;
  popularMovies$: Observable<MovieEntity[]>;
  topRatedMovies$: Observable<MovieEntity[]>;
  upComingMovies$: Observable<MovieEntity[]>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.isLoading$ = this.viewModel.isLoading$;

    this.nowPlayingMovies$ = this.viewModel.nowPlayingMovies$;
    this.popularMovies$ = this.viewModel.popularMovies$;
    this.topRatedMovies$ = this.viewModel.topRatedMovies$;
    this.upComingMovies$ = this.viewModel.upComingMovies$;
  }

  ngOnInit(): void {
    this.setupSeo();
    this.loadInitialData();
  }

  onCardClick(movieId: number): void {
    this.viewModel.redirectToMovieDetails(movieId);
  }

  onIconLoveClick(movie: MovieEntity): void {
    this.viewModel.addFavoriteMovie(movie);
    this.openSuccessFavoriteDialog();
  }

  private openSuccessFavoriteDialog(): void {
    this.dialog.open(SuccessFavoriteDialogComponent, {
      panelClass: 'custom-dialog-container',
      hasBackdrop: true,
      disableClose: false,
      backdropClass: 'cdk-overlay-backdrop',
    });
  }

  private loadInitialData(): void {
    this.viewModel.fetchMovies();
  }

  private setupSeo(): void {
    this.seoService.updateMetaTags({
      title: 'Movlix - Discover Movies & TV Shows',
      description:
        'Discover the latest movies and TV shows. Browse trending, popular, top rated, and upcoming movies. Watch trailers and manage your favorites.',
      url: environment.pageUrl,
      type: 'website',
    });

    this.seoService.setCanonicalUrl(environment.pageUrl);

    // JSON-LD Schema for Website
    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Movlix',
      url: environment.pageUrl,
      description:
        'Discover the latest movies and TV shows. Browse trending, popular, top rated, and upcoming movies.',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${environment.pageUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    });
  }
}

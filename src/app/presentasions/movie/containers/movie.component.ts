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
import { SeoService } from '../../../shared/services/seo/seo.service';
import { environment } from '../../../../environments/environment';

@Component({
  templateUrl: './movie.component.html',
  imports: [
    LoadingScreenComponent,
    HeaderComponent,
    HeroComponent,
    CardListComponent,
    SuccessFavoriteDialogComponent,
    AsyncPipe,
  ],
})
export class MovieComponent implements OnInit {
  private viewModel = inject(MovieViewModel);
  private seoService = inject(SeoService);

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
    this.setupSeo();
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

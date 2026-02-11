import { Dialog } from '@angular/cdk/dialog';
import { AsyncPipe, NgClass } from '@angular/common';
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

type TabType = 'nowPlaying' | 'popular' | 'topRated' | 'upComing';

@Component({
  templateUrl: './movie.component.html',
  imports: [
    LoadingScreenComponent,
    HeaderComponent,
    HeroComponent,
    CardListComponent,
    AsyncPipe,
    NgClass,
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

  activeTab: TabType = 'nowPlaying';

  tabs = [
    { id: 'nowPlaying' as TabType, label: 'Now Playing' },
    { id: 'popular' as TabType, label: 'Popular' },
    { id: 'topRated' as TabType, label: 'Top Rated' },
    { id: 'upComing' as TabType, label: 'Up Coming' },
  ];

  private readonly movieMap: Record<TabType, Observable<MovieEntity[]>> = {
    nowPlaying: this.viewModel.nowPlayingMovies$,
    popular: this.viewModel.popularMovies$,
    topRated: this.viewModel.topRatedMovies$,
    upComing: this.viewModel.upComingMovies$,
  };

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

  onTabClick(tabId: TabType): void {
    this.activeTab = tabId;
  }

  get currentMovies$(): Observable<MovieEntity[]> {
    return this.movieMap[this.activeTab];
  }

  get currentTabLabel(): string {
    const tab = this.tabs.find(t => t.id === this.activeTab);
    return tab ? tab.label : 'Now Playing';
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

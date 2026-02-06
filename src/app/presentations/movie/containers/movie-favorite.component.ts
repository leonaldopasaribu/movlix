import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { LoadingScreenComponent } from '../../../shared/components/loading-screen/loading-screen.component';
import { SeoService } from '../../../shared/services/seo/seo.service';
import { CardListComponent } from '../components/card-list.component';
import { MovieFavoriteViewModel } from '../view-models/movie-favorite.view-model';

import { MovieEntity } from 'src/app/core/entities/movie.entity';

@Component({
  templateUrl: './movie-favorite.component.html',
  imports: [
    LoadingScreenComponent,
    HeaderComponent,
    CardListComponent,
    AsyncPipe,
  ],
})
export class MovieFavoriteComponent implements OnInit {
  private viewModel = inject(MovieFavoriteViewModel);
  private seoService = inject(SeoService);

  isLoading$: Observable<boolean>;

  favoriteMovies$: Observable<MovieEntity[] | null>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.isLoading$ = this.viewModel.isLoading$;

    this.favoriteMovies$ = this.viewModel.favoriteMovies$;
  }

  ngOnInit(): void {
    this.setupSeo();
    this.viewModel.getFavoriteMovies();
  }

  trackByIndex(index: number): number {
    return index;
  }

  onRemoveFromFavorite(movie: MovieEntity): void {
    this.viewModel.removeFavoriteMovie(movie);
  }

  private setupSeo(): void {
    const favoriteUrl = `${environment.pageUrl}/movie/favorite`;

    this.seoService.updateMetaTags({
      title: 'My Favorite Movies - Movlix',
      description:
        'Browse and manage your favorite movies collection on Movlix. Keep track of movies you love.',
      url: favoriteUrl,
      type: 'website',
    });

    this.seoService.setCanonicalUrl(favoriteUrl);
  }
}

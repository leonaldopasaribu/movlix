import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MovieRoutingModule } from './movie-routing.module';

import { HeroComponent } from '../components/hero/hero.component';
import { MovieComponent } from '../containers/movie.component';
import { MovieDetailComponent } from '../containers/movie-detail.component';
import { MovieStore } from '../stores/movie.store';
import { MovieDetailStore } from '../stores/movie-detail.store';
import { MovieViewModel } from '../view-models/movie.view-model';
import { MovieDetailViewModel } from './../view-models/movie-detail.view-model';

import { HeaderModule } from 'src/app/shared/components/header';
import { CardListModule } from 'src/app/shared/components/card-list';
import { LoadingScreenModule } from 'src/app/shared/components/loading-screen';

import { MovieMapperTmdb } from 'src/app/data/movie/movie.mapper.tmdb';
import { MovieRepositoryTmdb } from 'src/app/data/movie/movie.repository.tmdb';

import { MovieRepository } from 'src/app/core/repositories/movie.repositories';

@NgModule({
  declarations: [MovieComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    HeaderModule,
    CardListModule,
    HeroComponent,
    LoadingScreenModule,
  ],
  providers: [
    MovieStore,
    MovieDetailStore,
    MovieViewModel,
    MovieDetailViewModel,
    MovieMapperTmdb,
    { provide: MovieRepository, useClass: MovieRepositoryTmdb },
  ],
})
export class MovieModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MovieRoutingModule } from './movie-routing.module';

import { HeroComponent } from '../components/hero.component';
import { MovieComponent } from '../containers/movie.component';
import { CardListComponent } from '../components/card-list.component';
import { MovieDetailComponent } from '../containers/movie-detail.component';
import { MovieStore } from '../stores/movie.store';
import { MovieDetailStore } from '../stores/movie-detail.store';
import { MovieViewModel } from '../view-models/movie.view-model';
import { MovieDetailViewModel } from './../view-models/movie-detail.view-model';

import { HeaderModule } from 'src/app/shared/components/header';
import { LoadingScreenModule } from 'src/app/shared/components/loading-screen';
import { CardModule } from 'src/app/shared/components/card';

import { MovieMapperTmdb } from 'src/app/data/movie/movie.mapper.tmdb';
import { MovieRepositoryTmdb } from 'src/app/data/movie/movie.repository.tmdb';

import { MovieRepository } from 'src/app/core/repositories/movie.repositories';

@NgModule({
  declarations: [MovieComponent, CardListComponent, MovieDetailComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    HeaderModule,
    HeroComponent,
    CardModule,
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

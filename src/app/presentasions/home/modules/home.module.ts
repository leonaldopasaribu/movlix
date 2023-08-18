import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from '../containers/home.component';
import { MovieStore } from '../stores/movie.store';
import { MovieViewModel } from '../view-models/movie.view-model';

import { HeaderModule } from 'src/app/shared/components/header';
import { CardListModule } from 'src/app/shared/components/card-list';

import { MovieMapperTmdb } from 'src/app/data/movie/movie.mapper.tmdb';
import { MovieRepositoryTmdb } from 'src/app/data/movie/movie.repository.tmdb';

import { MovieRepository } from 'src/app/core/repositories/movie.repositories';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, HeaderModule, CardListModule],
  providers: [
    MovieStore,
    MovieViewModel,
    MovieMapperTmdb,
    { provide: MovieRepository, useClass: MovieRepositoryTmdb },
  ],
})
export class HomeModule {}

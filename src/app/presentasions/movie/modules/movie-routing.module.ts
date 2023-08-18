import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from '../containers/movie.component';
import { MovieDetailComponent } from '../containers/movie-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MovieComponent,
  },
  {
    path: 'movie/:movieId',
    component: MovieDetailComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}

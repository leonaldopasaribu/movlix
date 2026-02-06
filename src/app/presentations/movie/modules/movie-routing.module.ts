import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../containers/movie.component').then(m => m.MovieComponent),
  },
  {
    path: 'movie/favorite',
    loadComponent: () =>
      import('../containers/movie-favorite.component').then(
        m => m.MovieFavoriteComponent,
      ),
  },
  {
    path: 'movie/:movieId',
    loadComponent: () =>
      import('../containers/movie-detail.component').then(
        m => m.MovieDetailComponent,
      ),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}

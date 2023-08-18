import { Component, OnInit } from '@angular/core';

import { MovieViewModel } from '../view-models/movie.view-model';

@Component({
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private movieViewModel: MovieViewModel) {}

  ngOnInit(): void {
    this.movieViewModel.onFetchMovies();
  }
}

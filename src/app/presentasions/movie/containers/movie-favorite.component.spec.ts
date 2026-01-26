import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFavoriteComponent } from './movie-favorite.component';

import { CardListComponent } from '../components/card-list.component';
import { MovieFavoriteViewModel } from '../view-models/movie-favorite.view-model';

import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';

describe('MovieFavoriteComponent', () => {
  let component: MovieFavoriteComponent;
  let fixture: ComponentFixture<MovieFavoriteComponent>;
  let viewModel: MovieFavoriteViewModel;

  const movieFavoriteViewModelSpy = jasmine.createSpyObj(
    'MovieFavoriteViewModel',
    ['getFavoriteMovies'],
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderModule,
        DialogModule,
        MovieFavoriteComponent,
        CardListComponent,
      ],
      providers: [
        {
          provide: MovieFavoriteViewModel,
          useValue: movieFavoriteViewModelSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieFavoriteComponent);
    component = fixture.componentInstance;
    viewModel = TestBed.inject(MovieFavoriteViewModel);
  });

  it('should create MovieFavoriteComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return 1 when trackByIndex is called with argument 1', () => {
    const stubArgument = 1;

    const result = component.trackByIndex(1);

    expect(result).toEqual(stubArgument);
  });

  it('should call getFavoriteMovies from movie detail view model when component executed', () => {
    const getFavoriteMoviesSpy = viewModel.getFavoriteMovies as jasmine.Spy;

    fixture.detectChanges();

    expect(getFavoriteMoviesSpy).toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CardListComponent } from '../components/card-list.component';

import { LoadingScreenModule } from 'src/app/shared/components/loading-screen';
import { HeaderModule } from 'src/app/shared/components/header';

import { MOVIE_URL } from 'src/app/shared/const/route-url.const';

describe('CardListComponent', () => {
  let component: CardListComponent;
  let fixture: ComponentFixture<CardListComponent>;
  let router: Router;

  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardListComponent],
      imports: [LoadingScreenModule, HeaderModule],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardListComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create CardListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return 1 when trackByIndex is called with argument 1', () => {
    const stubArgument = 1;

    const result = component.trackByIndex(1);

    expect(result).toEqual(stubArgument);
  });

  it('should call navigateByUrl with "movie/1" when onCardClick method is called', () => {
    const movieIdStub = 1;
    const expectedUrl = `${MOVIE_URL}/${movieIdStub}`;
    const navigateByUrlSpy = router.navigateByUrl as jasmine.Spy;

    component.onCardClick(movieIdStub);

    expect(navigateByUrlSpy).toHaveBeenCalledWith(expectedUrl);
  });
});

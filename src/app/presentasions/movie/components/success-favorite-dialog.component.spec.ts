import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFavoriteDialogComponent } from './success-favorite-dialog.component';

import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';

describe('SuccessFavoriteDialogComponent', () => {
  let component: SuccessFavoriteDialogComponent;
  let fixture: ComponentFixture<SuccessFavoriteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessFavoriteDialogComponent],
      imports: [DialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessFavoriteDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create SuccessFavoriteDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeClicked event when onCloseClick is called', () => {
    const emitSpy = spyOn(component.closeClicked, 'emit');

    component.onCloseClick();

    expect(emitSpy).toHaveBeenCalled();
  });
});

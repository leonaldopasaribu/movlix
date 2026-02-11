import { DialogRef } from '@angular/cdk/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFavoriteDialogComponent } from './success-favorite-dialog.component';

import { DialogModule } from 'src/app/shared/components/dialog/dialog.module';

describe('SuccessFavoriteDialogComponent', () => {
  let component: SuccessFavoriteDialogComponent;
  let fixture: ComponentFixture<SuccessFavoriteDialogComponent>;
  let dialogRef: jasmine.SpyObj<DialogRef>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('DialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [DialogModule, SuccessFavoriteDialogComponent],
      providers: [{ provide: DialogRef, useValue: dialogRefSpy }],
    }).compileComponents();

    dialogRef = TestBed.inject(DialogRef) as jasmine.SpyObj<DialogRef>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessFavoriteDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create SuccessFavoriteDialogComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when onCloseClick is called', () => {
    component.onCloseClick();

    expect(dialogRef.close).toHaveBeenCalled();
  });
});

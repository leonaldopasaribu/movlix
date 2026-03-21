import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeClicked when onCloseClick is called', () => {
    spyOn(component.closeClicked, 'emit');

    component.onCloseClick();

    expect(component.closeClicked.emit).toHaveBeenCalled();
  });

  it('should emit closeClicked when onBackdropClick is called', () => {
    spyOn(component.closeClicked, 'emit');

    component.onBackdropClick();

    expect(component.closeClicked.emit).toHaveBeenCalled();
  });

  it('should emit closeClicked when clicking close button', () => {
    spyOn(component.closeClicked, 'emit');

    const closeBtn = fixture.debugElement.query(
      By.css('div[aria-hidden="true"]'),
    );
    closeBtn.triggerEventHandler('click', null);

    expect(component.closeClicked.emit).toHaveBeenCalled();
  });

  it('should emit closeClicked when clicking backdrop', () => {
    spyOn(component.closeClicked, 'emit');

    const backdrop = fixture.debugElement.query(By.css('div.fixed'));
    backdrop.triggerEventHandler('click', null);

    expect(component.closeClicked.emit).toHaveBeenCalled();
  });

  it('should NOT emit closeClicked when clicking inside dialog content', () => {
    spyOn(component.closeClicked, 'emit');

    const dialogContent = fixture.debugElement.queryAll(By.css('div.fixed'))[1];
    dialogContent.triggerEventHandler('click', {
      stopPropagation: () => {},
    });

    expect(component.closeClicked.emit).not.toHaveBeenCalled();
  });
});

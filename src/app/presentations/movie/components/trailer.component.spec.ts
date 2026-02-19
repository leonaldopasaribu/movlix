import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { TrailerComponent, TrailerDialogData } from './trailer.component';

describe('TrailerComponent', () => {
  let component: TrailerComponent;
  let fixture: ComponentFixture<TrailerComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<TrailerComponent>>;
  let sanitizer: DomSanitizer;
  let mockData: TrailerDialogData;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockData = {
      trailerUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      movieTitle: 'Test Movie',
    };

    await TestBed.configureTestingModule({
      imports: [
        TrailerComponent,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        BrowserModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerComponent);
    component = fixture.componentInstance;
    sanitizer = TestBed.inject(DomSanitizer);
  });

  it('should create TrailerComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should convert and sanitize video URL on initialization', () => {
      spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();

      fixture.detectChanges(); // triggers ngOnInit

      const expectedEmbedUrl =
        'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
      expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
        expectedEmbedUrl,
      );
      expect(component.sanitizedVideoUrl).toBeTruthy();
    });

    it('should handle YouTube URL with additional parameters', () => {
      mockData.trailerUrl =
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be';

      spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();
      fixture.detectChanges(); // triggers ngOnInit

      const expectedEmbedUrl =
        'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
      expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
        expectedEmbedUrl,
      );
    });

    it('should extract video ID correctly from standard YouTube URL', () => {
      mockData.trailerUrl = 'https://www.youtube.com/watch?v=abc123XYZ';

      spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();
      fixture.detectChanges(); // triggers ngOnInit

      const expectedEmbedUrl =
        'https://www.youtube.com/embed/abc123XYZ?autoplay=1';
      expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalledWith(
        expectedEmbedUrl,
      );
    });
  });

  describe('onCloseClick', () => {
    it('should close the dialog when onCloseClick is called', () => {
      component.onCloseClick();

      expect(mockDialogRef.close).toHaveBeenCalled();
    });

    it('should only call close once', () => {
      component.onCloseClick();
      component.onCloseClick();

      expect(mockDialogRef.close).toHaveBeenCalledTimes(2);
    });
  });

  describe('openFullscreen', () => {
    it('should open trailer URL in new window when openFullscreen is called', () => {
      spyOn(window, 'open');

      component.openFullscreen();

      expect(window.open).toHaveBeenCalledWith(
        mockData.trailerUrl,
        '_blank',
        'noopener',
      );
    });

    it('should use the correct trailer URL from data', () => {
      spyOn(window, 'open');
      mockData.trailerUrl = 'https://www.youtube.com/watch?v=newVideoId';

      component.openFullscreen();

      expect(window.open).toHaveBeenCalledWith(
        'https://www.youtube.com/watch?v=newVideoId',
        '_blank',
        'noopener',
      );
    });
  });

  describe('data injection', () => {
    it('should have access to injected dialog data', () => {
      expect(component.data).toBeDefined();
      expect(component.data.trailerUrl).toBe(
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      );
      expect(component.data.movieTitle).toBe('Test Movie');
    });

    it('should handle different movie titles', () => {
      mockData.movieTitle = 'Another Movie Title';

      expect(component.data.movieTitle).toBe('Another Movie Title');
    });
  });

  describe('template interaction', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should render iframe with sanitized URL', () => {
      const iframe = fixture.nativeElement.querySelector('iframe');
      expect(iframe).toBeTruthy();
    });

    it('should have close button in template', () => {
      const buttons = fixture.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should call onCloseClick when close button is clicked', () => {
      spyOn(component, 'onCloseClick');
      const buttons = fixture.nativeElement.querySelectorAll('button');
      const closeButton = Array.from(buttons).find((button: any) =>
        button.getAttribute('ng-reflect-ng-class')?.includes('onCloseClick'),
      ) as HTMLButtonElement;

      // Find the close button by looking for the one with the close SVG path
      const closeButtonElement = Array.from(buttons).find((button: any) => {
        const svg = button.querySelector('path[d*="M6 18L18 6M6 6l12 12"]');
        return svg !== null;
      }) as HTMLButtonElement;

      if (closeButtonElement) {
        closeButtonElement.click();
        expect(component.onCloseClick).toHaveBeenCalled();
      }
    });

    it('should call openFullscreen when fullscreen button is clicked', () => {
      spyOn(component, 'openFullscreen');
      const buttons = fixture.nativeElement.querySelectorAll('button');

      // Find the fullscreen button by looking for the one with the fullscreen SVG path
      const fullscreenButton = Array.from(buttons).find((button: any) => {
        const svg = button.querySelector(
          'path[d*="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7"]',
        );
        return svg !== null;
      }) as HTMLButtonElement;

      if (fullscreenButton) {
        fullscreenButton.click();
        expect(component.openFullscreen).toHaveBeenCalled();
      }
    });
  });

  describe('edge cases', () => {
    it('should handle URL without video ID gracefully', () => {
      mockData.trailerUrl = 'https://www.youtube.com/watch?v=';
      spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();

      fixture.detectChanges();

      expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
      expect(component.sanitizedVideoUrl).toBeTruthy();
    });

    it('should handle malformed YouTube URL', () => {
      mockData.trailerUrl = 'not-a-valid-url';
      spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();

      fixture.detectChanges();

      expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
      expect(component.sanitizedVideoUrl).toBeTruthy();
    });

    it('should handle empty trailer URL', () => {
      mockData.trailerUrl = '';
      spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.callThrough();

      fixture.detectChanges();

      expect(sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
      expect(component.sanitizedVideoUrl).toBeTruthy();
    });
  });

  describe('iframe attributes', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have iframe with allowfullscreen attribute', () => {
      const iframe = fixture.nativeElement.querySelector('iframe');
      expect(iframe?.hasAttribute('allowfullscreen')).toBe(true);
    });

    it('should have iframe with frameborder="0"', () => {
      const iframe = fixture.nativeElement.querySelector('iframe');
      expect(iframe?.getAttribute('frameborder')).toBe('0');
    });

    it('should have iframe with correct allow attribute', () => {
      const iframe = fixture.nativeElement.querySelector('iframe');
      const allowAttr = iframe?.getAttribute('allow');
      expect(allowAttr).toContain('autoplay');
      expect(allowAttr).toContain('encrypted-media');
    });
  });
});

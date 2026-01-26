import { Component, inject, OnInit, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface TrailerDialogData {
  trailerUrl: string;
  movieTitle: string;
}

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
})
export class TrailerComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private dialogRef = inject(MatDialogRef<TrailerComponent>);

  sanitizedVideoUrl!: SafeResourceUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: TrailerDialogData) {}

  ngOnInit(): void {
    const embedUrl = this.convertToEmbedUrl(this.data.trailerUrl);
    this.sanitizedVideoUrl =
      this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  openFullscreen(): void {
    window.open(this.data.trailerUrl, '_blank', 'noopener');
  }

  private convertToEmbedUrl(url: string): string {
    // Extract video ID from YouTube URL
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
}

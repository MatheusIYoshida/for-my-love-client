import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LyricsPanel } from '../lyrics-panel/lyrics-panel';
import { MusicControls } from '../music-controls/music-controls';
import { PhotoCarousel } from '../photo-carousel/photo-carousel';
import { RelationshipCounter } from '../relationship-counter/relationship-counter';

@Component({
  selector: 'app-player-page',
  imports: [RouterLink, PhotoCarousel, RelationshipCounter, MusicControls, LyricsPanel],
  templateUrl: './player-page.html',
  styleUrl: './player-page.scss',
})
export class PlayerPage {
  protected readonly isMenuOpen = signal(false);

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }
}

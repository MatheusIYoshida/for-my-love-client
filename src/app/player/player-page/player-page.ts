import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
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
  @ViewChild('playerMenu') private readonly playerMenu?: ElementRef<HTMLElement>;

  protected readonly isMenuOpen = signal(false);

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }

  @HostListener('document:click', ['$event']) protected closeMenuOnOutsideClick(event: MouseEvent): void {
    if (!this.isMenuOpen()) {
      return;
    }

    const clickedElement = event.target;

    if (clickedElement instanceof Node && this.playerMenu?.nativeElement.contains(clickedElement)) {
      return;
    }

    this.isMenuOpen.set(false);
  }

  @HostListener('document:keydown.escape') protected closeMenuOnEscape(): void {
    this.isMenuOpen.set(false);
  }
}

import { Component } from '@angular/core';
import { LyricsPanel } from '../lyrics-panel/lyrics-panel';
import { MusicControls } from '../music-controls/music-controls';
import { PhotoCarousel } from '../photo-carousel/photo-carousel';
import { RelationshipCounter } from '../relationship-counter/relationship-counter';

@Component({
  selector: 'app-player-page',
  imports: [PhotoCarousel, RelationshipCounter, MusicControls, LyricsPanel],
  templateUrl: './player-page.html',
  styleUrl: './player-page.scss',
})
export class PlayerPage {}

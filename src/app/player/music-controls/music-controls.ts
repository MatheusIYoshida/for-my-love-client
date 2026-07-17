import { Component, ElementRef, ViewChild, computed, signal } from '@angular/core';

@Component({
  selector: 'app-music-controls',
  imports: [],
  templateUrl: './music-controls.html',
  styleUrl: './music-controls.scss',
})
export class MusicControls {
  @ViewChild('audioPlayer')
  private readonly audioPlayer?: ElementRef<HTMLAudioElement>;

  protected readonly isPlaying = signal(false);
  protected readonly isLooping = signal(false);
  protected readonly currentTime = signal(0);
  protected readonly duration = signal(0);
  protected readonly progress = computed(() => {
    const duration = this.duration();

    if (!duration) {
      return '0%';
    }

    return `${(this.currentTime() / duration) * 100}%`;
  });

  protected toggleAudio(): void {
    const audio = this.audioPlayer?.nativeElement;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      void audio.play();
      this.isPlaying.set(true);
      return;
    }

    audio.pause();
    this.isPlaying.set(false);
  }

  protected seekBackward(): void {
    this.seekBy(-10);
  }

  protected seekForward(): void {
    this.seekBy(10);
  }

  protected toggleLoop(): void {
    const audio = this.audioPlayer?.nativeElement;

    if (!audio) {
      return;
    }

    audio.loop = !audio.loop;
    this.isLooping.set(audio.loop);
  }

  protected updateDuration(): void {
    const audio = this.audioPlayer?.nativeElement;

    if (!audio) {
      return;
    }

    this.duration.set(audio.duration || 0);
  }

  protected updateCurrentTime(): void {
    const audio = this.audioPlayer?.nativeElement;

    if (!audio) {
      return;
    }

    this.currentTime.set(audio.currentTime);
  }

  protected handleAudioEnded(): void {
    this.isPlaying.set(false);
    this.currentTime.set(0);
  }

  private seekBy(seconds: number): void {
    const audio = this.audioPlayer?.nativeElement;

    if (!audio) {
      return;
    }

    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), audio.duration || audio.currentTime);
    this.currentTime.set(audio.currentTime);
  }
}

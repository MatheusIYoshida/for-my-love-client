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
  protected readonly isAudioLoading = signal(false);
  protected readonly hasAudioError = signal(false);
  protected readonly currentTime = signal(0);
  protected readonly duration = signal(0);
  protected readonly canSeek = computed(() => !this.hasAudioError() && this.duration() > 0);
  protected readonly progress = computed(() => {
    const duration = this.duration();
    const currentTime = this.currentTime();

    if (!Number.isFinite(duration) || duration <= 0) {
      return '0%';
    }

    const progress = Math.min(Math.max((currentTime / duration) * 100, 0), 100);

    return `${progress}%`;
  });

  protected async toggleAudio(): Promise<void> {
    const audio = this.audioPlayer?.nativeElement;

    if (!audio || this.hasAudioError() || this.isAudioLoading()) {
      return;
    }

    if (audio.paused) {
      try {
        this.isAudioLoading.set(true);
        this.hasAudioError.set(false);
        await audio.play();
        this.isPlaying.set(true);
      } catch {
        this.isPlaying.set(false);
        this.hasAudioError.set(true);
      } finally {
        this.isAudioLoading.set(false);
      }

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

    if (!audio || this.hasAudioError()) {
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

    this.duration.set(Number.isFinite(audio.duration) ? audio.duration : 0);
    this.hasAudioError.set(false);
  }

  protected handleAudioReady(): void {
    this.isAudioLoading.set(false);
    this.hasAudioError.set(false);
  }

  protected updateCurrentTime(): void {
    const audio = this.audioPlayer?.nativeElement;

    if (!audio) {
      return;
    }

    this.currentTime.set(audio.currentTime);

    if (!this.duration() && Number.isFinite(audio.duration)) {
      this.duration.set(audio.duration);
    }
  }

  protected handleAudioEnded(): void {
    this.isPlaying.set(false);
    this.isAudioLoading.set(false);
    this.currentTime.set(0);
  }

  protected handleAudioError(): void {
    this.isPlaying.set(false);
    this.isAudioLoading.set(false);
    this.hasAudioError.set(true);
    this.currentTime.set(0);
    this.duration.set(0);
  }

  private seekBy(seconds: number): void {
    const audio = this.audioPlayer?.nativeElement;

    if (!audio || !this.canSeek()) {
      return;
    }

    audio.currentTime = Math.min(Math.max(audio.currentTime + seconds, 0), audio.duration || audio.currentTime);
    this.currentTime.set(audio.currentTime);
  }
}

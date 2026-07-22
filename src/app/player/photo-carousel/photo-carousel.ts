import { Component, OnDestroy, computed, signal } from '@angular/core';

type CarouselPhoto = {
  src: string;
  alt: string;
};

@Component({
  selector: 'app-photo-carousel',
  imports: [],
  templateUrl: './photo-carousel.html',
  styleUrl: './photo-carousel.scss',
})
export class PhotoCarousel implements OnDestroy {
  protected readonly photos: CarouselPhoto[] = [
    {
      src: 'assets/images/picture1.jpeg',
      alt: 'Foto do casal 1',
    },
    {
      src: 'assets/images/picture2.jpeg',
      alt: 'Foto do casal 2',
    },
    {
      src: 'assets/images/picture3.jpeg',
      alt: 'Foto do casal 3',
    },
  ];

  protected readonly currentPhotoIndex = signal(0);
  protected readonly loadedPhotoIndexes = signal<ReadonlySet<number>>(new Set());
  protected readonly translateX = computed(() => `translateX(-${this.currentPhotoIndex() * 100}%)`);
  private readonly swipeThreshold = 48;
  private autoplayIntervalId = window.setInterval(() => this.goToNextPhoto(), 4200);
  private pointerStartX: number | null = null;

  ngOnDestroy(): void {
    window.clearInterval(this.autoplayIntervalId);
  }

  protected goToPhoto(index: number): void {
    this.currentPhotoIndex.set(index);
    this.resetAutoplay();
  }

  protected handlePointerStart(event: PointerEvent): void {
    this.pointerStartX = event.clientX;
  }

  protected handlePointerEnd(event: PointerEvent): void {
    if (this.pointerStartX === null) {
      return;
    }

    const swipeDistance = event.clientX - this.pointerStartX;
    this.pointerStartX = null;

    if (Math.abs(swipeDistance) < this.swipeThreshold) {
      return;
    }

    if (swipeDistance > 0) {
      this.goToPreviousPhoto();
      return;
    }

    this.goToNextPhoto();
  }

  protected isPhotoLoaded(index: number): boolean {
    return this.loadedPhotoIndexes().has(index);
  }

  protected markPhotoAsLoaded(index: number): void {
    this.loadedPhotoIndexes.update((loadedPhotoIndexes) => new Set(loadedPhotoIndexes).add(index));
  }

  private goToNextPhoto(): void {
    this.currentPhotoIndex.update((index) => (index + 1) % this.photos.length);
    this.resetAutoplay();
  }

  private goToPreviousPhoto(): void {
    this.currentPhotoIndex.update((index) => (index - 1 + this.photos.length) % this.photos.length);
    this.resetAutoplay();
  }

  private resetAutoplay(): void {
    window.clearInterval(this.autoplayIntervalId);
    this.autoplayIntervalId = window.setInterval(() => this.goToNextPhoto(), 4200);
  }
}

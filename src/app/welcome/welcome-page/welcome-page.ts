import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  imports: [RouterLink],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
})
export class WelcomePage {
  protected readonly hearts = Array.from({ length: 24 }, (_, index) => index);
  protected readonly heartPositions = [4, 12, 19, 27, 34, 42, 49, 57, 64, 72, 79, 87, 94];
  protected readonly heartDrifts = [-54, 0, 54];
  protected readonly heartDurations = [7.5, 8.2, 8.9, 9.6, 10.3];
  protected readonly heartSizes = [10, 14, 18, 22];
}

import { Routes } from '@angular/router';

import { PlayerPage } from './player/player-page/player-page';
import { WelcomePage } from './welcome/welcome-page/welcome-page';

export const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
    title: 'For My Love',
  },
  {
    path: 'player',
    component: PlayerPage,
    title: 'Nossa História',
  },
];

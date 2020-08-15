import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EpisodeComponent } from './pages/episode/episode.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'episode/:id', component: EpisodeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

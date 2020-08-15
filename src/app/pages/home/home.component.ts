import { EpisodeModel } from './../../models/episode.model';
import { Component, OnInit } from '@angular/core';
import { EpisodeService } from './../services/episode.service';
import { InfoModel } from '../../models/info.model';
import { EpisodeResponseModel } from '../../models/episode-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  info: InfoModel;
  episodes: EpisodeModel[];

  constructor(
    private episodeService: EpisodeService
  ) { }

  ngOnInit(): void {
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.episodeService.getEpisodes().subscribe(
      (res: EpisodeResponseModel) => {
        this.info = res.info;
        this.episodes = res.results;
      },
      error => console.error(error)
    );
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

}

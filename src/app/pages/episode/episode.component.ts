import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EpisodeAbstractComponent } from '../abstract-classes/episode-abstract.class';
import { EpisodeService } from './../services/episode.service';
import { EpisodeModel } from '../../models/episode.model';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent extends EpisodeAbstractComponent implements OnInit {

  episode: EpisodeModel;

  constructor(
    private episodeService: EpisodeService,
    private activatedRoute: ActivatedRoute,
    iziToast: Ng2IzitoastService
  ) {
    super(iziToast);
  }

  ngOnInit(): void {
    this.getParam();
  }

  getEpisode(id: number): void {
    this.loading = true;
    const subscription = this.episodeService.getEpisode(id).subscribe(
      (res: EpisodeModel) => this.episode = res,
      error => this.handleError(error),
      () => this.loading = false
    );
    this.subscriptions.push(subscription);
  }

  getParam(): void {
    const subscription = this.activatedRoute.params.subscribe(
      param => {
        const { id } = param;
        if (id && !isNaN(Number(id))) {
          this.getEpisode(id);
        }
      }
    );
    this.subscriptions.push(subscription);
  }

}

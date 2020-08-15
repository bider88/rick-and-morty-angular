import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { EpisodeAbstractComponent } from '../abstract-classes/episode-abstract.class';
import { EpisodeService } from './../services/episode.service';
import { InfoModel } from '../../models/info.model';
import { EpisodeResponseModel } from '../../models/episode-response.model';
import { EpisodeModel } from '../../models/episode.model';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends EpisodeAbstractComponent implements OnInit {

  info: InfoModel;
  episodes: EpisodeModel[];
  page: number;
  pageIndex: number;

  constructor(
    private episodeService: EpisodeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    iziToast: Ng2IzitoastService
  ) {
    super(iziToast);
  }

  ngOnInit(): void {
    this.getPage();
  }

  getEpisodes(page = 1): void {
    this.loading = true;
    const subscription = this.episodeService.getEpisodes(page).subscribe(
      (res: EpisodeResponseModel) => {
        this.info = res.info;
        this.episodes = res.results;
      },
      error => this.handleError(error),
      () => this.loading = false
    );
    this.subscriptions.push(subscription);
  }

  getPage(): void {
    const subscription = this.activatedRoute.queryParams.subscribe(
      param => {
        const { page } = param;
        if (page && !isNaN(Number(page))) {
          this.getEpisodes(page);
          this.pageIndex = page - 1;
        } else {
          this.getEpisodes();
          this.pageIndex = 0;
        }
      }
    );
    this.subscriptions.push(subscription);
  }

  trackByMethod(index: number, el: EpisodeModel): number {
    return el.id;
  }

  pageEvent(event: PageEvent): void {
    this.router.navigate([''], {
      queryParams: {
        page: event.pageIndex + 1
      }
    });
  }
}

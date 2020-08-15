import { Component, OnInit, OnDestroy } from '@angular/core';
import { EpisodeService } from './../services/episode.service';
import { InfoModel } from '../../models/info.model';
import { EpisodeResponseModel } from '../../models/episode-response.model';
import { EpisodeModel } from '../../models/episode.model';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  info: InfoModel;
  episodes: EpisodeModel[];
  loading: boolean;
  page: number;
  pageIndex: number;
  subscriptions: Subscription[] = [];

  constructor(
    private episodeService: EpisodeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getEpisodes(page = 1): void {
    this.loading = true;
    const subscription = this.episodeService.getEpisodes(page).subscribe(
      (res: EpisodeResponseModel) => {
        this.info = res.info;
        this.episodes = res.results;
      },
      error => console.error(error),
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

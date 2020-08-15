import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeAbstractComponent } from '../abstract-classes/episode-abstract.class';
import { EpisodeService } from './../services/episode.service';
import { CharacterModel } from './../../models/character.model';
import { EpisodeModel } from '../../models/episode.model';
import { Ng2IzitoastService } from 'ng2-izitoast';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent extends EpisodeAbstractComponent implements OnInit {

  episode: EpisodeModel;
  characters: CharacterModel[];

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
      (res: EpisodeModel) => {
        this.episode = res;
        this.getIdsFromCharacters();
      },
      error => this.handleError(error),
      () => this.loading = false
    );
    this.subscriptions.push(subscription);
  }

  getCharacters(ids: number[]): void {
    this.loading = true;
    const subscription = this.episodeService.getCharacters(ids).subscribe(
      (res: CharacterModel[]) => {
        this.characters = res;
      },
      error => this.handleError(error),
      () => this.loading = false
    );
    this.subscriptions.push(subscription);
  }

  getIdsFromCharacters(): void {
    const idCharacters = [];
    this.episode.characters.forEach(character => {
      const lastPosition = character.lastIndexOf('/');
      const id = character.substring((lastPosition + 1), character.length);
      idCharacters.push(Number(id));
    });
    this.getCharacters(idCharacters);
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

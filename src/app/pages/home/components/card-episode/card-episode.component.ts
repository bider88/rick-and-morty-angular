import { EpisodeModel } from './../../../../models/episode.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-episode',
  templateUrl: './card-episode.component.html',
  styleUrls: ['./card-episode.component.scss']
})
export class CardEpisodeComponent implements OnInit {

  @Input() episode: EpisodeModel;
  @Input() onlyOne: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}

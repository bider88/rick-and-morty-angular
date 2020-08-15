import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EpisodeResponseModel } from './../../models/episode-response.model';
import { EpisodeModel } from './../../models/episode.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(
    private http: HttpClient
  ) { }

  getEpisodes(): Observable<EpisodeResponseModel> {
    return this.http.get<EpisodeResponseModel>('https://rickandmortyapi.com/api/episode');
  }
}

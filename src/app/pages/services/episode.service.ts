import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { EpisodeResponseModel } from './../../models/episode-response.model';
import { EpisodeModel } from './../../models/episode.model';
import { CharacterModel } from './../../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  constructor(
    private http: HttpClient
  ) { }

  getEpisodes(page: number = 1): Observable<EpisodeResponseModel> {
    const params = new HttpParams().set('page', page.toString());
    return this.http.get<EpisodeResponseModel>(`${environment.urlApi}episode`, { params });
  }

  getEpisode(id: number): Observable<EpisodeModel> {
    return this.http.get<EpisodeModel>(`${environment.urlApi}episode/${id}`);
  }

  getCharacters(ids: number[]): Observable<CharacterModel[]> {
    return this.http.get<CharacterModel[]>(`${environment.urlApi}character/${ids.join(',')}`);
  }
}

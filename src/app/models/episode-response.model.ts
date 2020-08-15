import { InfoModel } from './info.model';
import { EpisodeModel } from './episode.model';

export interface EpisodeResponseModel {
  info: InfoModel;
  results: EpisodeModel[];
}

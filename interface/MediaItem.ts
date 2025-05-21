export interface IMediaItem {
  id: string;
  name: string;
  type: 'movie' | 'series' | 'miniseries';

  img: string;
  watchedInCinema: boolean;
  accompanied: boolean;
  accompaniedWith?: string;
}

export interface Genres {
  id: number;
  name: string;
}

export interface MovieDetail {
  title: string;
  tagline: string;
  background_image: string;
  poster_image: string;
  genres: Genres[];
  budget: number;
  homepage: string;
  overview: string;
  release_date: string;
  rating: number;
  runtime: number;
  trailer: string;
}

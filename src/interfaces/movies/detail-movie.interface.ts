export interface Genres {
  id: number;
  name: string;
}

export interface MovieDetail extends DataMovieCastDirector {
  title: string;
  tagline: string;
  background_image: string;
  poster_image: string;
  language: string;
  genres: Genres[];
  budget: number;
  homepage: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  trailer: string;
  revenue: number;
  status: string;
}

export interface DataMovieCast {
  character: string;
  name: string;
  img: string;
}

export interface DataMovieCastDirector {
  cast: DataMovieCast[];
  director: string;
}

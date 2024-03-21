export interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMovieResponse {
  Search: any[];
  totalResults: string;
  Response: string;
}

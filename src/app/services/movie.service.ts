import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  urlBase = 'https://www.omdbapi.com'
  urlKey = '85a0ae7b'
  pageDefault = 1;
  queryDefault = 'avengers';

  url = (query?: string, page?: number) => `${this.urlBase}/?apikey=${this.urlKey}&s=${query || this.queryDefault}&page=${page || this.pageDefault}`;

  searchMovies(query?: string, page?: number) {
    return this.http.get(this.url(query, page));
  }

  searchMovieById(id: string) {
    return this.http.get(`${this.urlBase}/?apikey=${this.urlKey}&i=${id}&plot=full`);
  }
}

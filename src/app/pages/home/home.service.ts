import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMovie, IMovieResponse } from './home.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeProvider {
  private moviesSubject: BehaviorSubject<IMovie[] | never[]> = new BehaviorSubject<IMovie[] | never[]>([]);
  responseMoviesSubject: BehaviorSubject<IMovieResponse | undefined> = new BehaviorSubject<IMovieResponse | undefined>(undefined);
  movies: Observable<IMovie[]> = this.moviesSubject.asObservable();

  constructor() { }

  setMovies(value: IMovie[]): void {
    this.moviesSubject.next(value);
  }

  getMovies(): Observable<IMovie[]> {
    return this.moviesSubject.asObservable();
  }

  setMoviesResponse(value: IMovieResponse): void {
    this.responseMoviesSubject.next(value);
  }

  getMoviesResponse(): Observable<IMovieResponse | undefined> {
    return this.responseMoviesSubject.asObservable();
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IMovie } from './home.interface';

@Injectable({
  providedIn: 'root'
})
export class HomeProvider {
  private moviesSubject: BehaviorSubject<IMovie[] | never[]> = new BehaviorSubject<IMovie[] | never[]>([]);
  movies: Observable<IMovie[]> = this.moviesSubject.asObservable();

  constructor() { }

  setMovies(value: IMovie[]): void {
    this.moviesSubject.next(value);
  }

  getMovies(): Observable<IMovie[]> {
    return this.moviesSubject.asObservable();
  }
}

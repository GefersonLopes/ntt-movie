import { Component } from '@angular/core';
import { IMovie, IMovieResponse } from '../../pages/home/home.interface';
import { HomeProvider } from '../../pages/home/home.service';
import { CommonModule } from '@angular/common';
import { PaginateProvider } from './paginate.service';

@Component({
  selector: 'app-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss'
})
export class PaginateComponent {
  responseMovies: IMovieResponse | undefined = undefined;
  movies: IMovie[] | never[] = [];
  page = 1;

  constructor(
    private homeProvider: HomeProvider,
    private paginateProvider: PaginateProvider,
  ) { }

  ngOnInit(): void {
    this.homeProvider.getMovies().subscribe((movies: IMovie[] | never[]) => {
      this.movies = movies;
    });


    this.homeProvider.getMoviesResponse().subscribe((response: any) => {
      this.responseMovies = response;
    });
  }

  totalPages(): number {
    if (this.responseMovies?.totalResults === undefined) return 0;
    return Math.ceil(Number(this.responseMovies.totalResults) / 10);
  }

  nextPage(): void {
    if (this.responseMovies?.totalResults === undefined) return;
    if ((Number(this.responseMovies.totalResults)/10) > this.page) {
      this.page++;
      this.paginateProvider.setPage(this.page);
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.paginateProvider.setPage(this.page);
    }
  }

  setPage(value: number): void {
    this.page = value;
    this.paginateProvider.setPage(value);
  }
}

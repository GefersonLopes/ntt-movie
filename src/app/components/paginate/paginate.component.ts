import { Component } from '@angular/core';
import { IMovie, IMovieResponse } from '../../pages/home/home.interface';
import { HomeProvider } from '../../pages/home/home.service';
import { CommonModule } from '@angular/common';
import { PaginateProvider } from './paginate.service';
import { Observable } from 'rxjs';

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
  page: number = 1;

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
      const nextPage = this.page + 1;
      this.paginateProvider.setPage(nextPage);
      this.updatePage();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      const previousPage = this.page - 1;
      this.paginateProvider.setPage(previousPage);
      this.updatePage();
    }
  }

  setPage(value: number): void {
    this.paginateProvider.setPage(value);
    this.updatePage();
  }

  updatePage(): void {
    this.paginateProvider.getPage().subscribe((page: number) => {
      if (page !== this.page) {
        this.page = page;
      }
    });
  }
}

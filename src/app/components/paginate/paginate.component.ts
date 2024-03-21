import { Component } from '@angular/core';
import { IMovie } from '../../pages/home/home.interface';
import { HomeProvider } from '../../pages/home/home.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss'
})
export class PaginateComponent {
  movies: IMovie[] | never[] = [];
  page = 1;

  constructor(
    private homeProvider: HomeProvider,
  ) { }

  ngOnInit(): void {
    this.homeProvider.getMovies().subscribe((movies: IMovie[] | never[]) => {
      this.movies = movies;
    });
  }

  itemsPerPage(): number {
    return this.page * 3;
  }

  nextPage(): void {
    if (this.movies.length > this.itemsPerPage()) {
      this.page++;
    }
    console.log('page', this.page);
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  setPage(value: number): void {
    this.page = value;
  }

  roundedPage(): number {
    const multiply = Math.pow(10, 0);
    return Math.ceil((this.movies.length / 3) * multiply) / multiply;
  }
}

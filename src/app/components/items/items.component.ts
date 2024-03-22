import { Component } from '@angular/core';
import { IMovie, IMovieResponse } from '../../pages/home/home.interface';
import { HomeProvider } from '../../pages/home/home.service';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../paginate/paginate.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule,
    PaginateComponent,
    MatIconModule,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  movies: IMovie[] | never[] = [];
  page = 1;
  responseMovies: IMovieResponse | undefined = undefined;

  constructor(
    private homeProvider: HomeProvider,
  ) { }

  ngOnInit(): void {
    this.homeProvider.getMovies().subscribe((movies: IMovie[] | never[]) => {
      this.movies = movies;
    });
  }

  notImage(): string {
    return 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
  }
}

import { Component } from '@angular/core';
import { IMovie } from '../../pages/home/home.interface';
import { HomeProvider } from '../../pages/home/home.service';
import { CommonModule } from '@angular/common';
import { PaginateComponent } from '../paginate/paginate.component';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    CommonModule,
    PaginateComponent,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
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
}

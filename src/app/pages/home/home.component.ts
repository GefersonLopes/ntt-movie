import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IMovie } from './home.interface';
import { LoadingProvider } from '../../components/loading/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { ItemsComponent } from '../../components/items/items.component';
import { HomeProvider } from './home.service';
import { PaginateProvider } from '../../components/paginate/paginate.service';
import { HeaderProvider } from '../../components/header/header.service';
import { combineLatest } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatIconModule,
    ItemsComponent,
    RouterLink,
    RouterOutlet,
  ],
  providers: [MovieService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  mainMovie: IMovie | undefined;
  query: string = '';
  page: number = 1;
  currentQuery: string = '';

  constructor(
    private moviesService: MovieService,
    private loadingProvider: LoadingProvider,
    private homeProvider: HomeProvider,
    private paginateProvider: PaginateProvider,
    private headerProvider: HeaderProvider,
    ) { }

  ngOnInit(): void {
    combineLatest([this.headerProvider.getQuery(), this.paginateProvider.getPage()])
      .subscribe(([query, page]) => {
        this.query = query;
        this.page = page;

        if (query && query !== this.currentQuery) {
          this.page = 1;
          this.paginateProvider.setPage(1);
        } else {
          this.page = page;
        }

        this.currentQuery = query;
        this.searchMovies(this.query, this.page);
      });
  }


  searchMovies(query?: string, page?: number) {
    this.setLoading(true);
    setTimeout(() => {
      return this.moviesService.searchMovies(query || 'avengers', page)
      .subscribe((data: any) => {
        data.Search?.map((movie: IMovie, index: number) => {
          if (index === 0) {
            this.mainMovie = movie;
          }
        });
        const splitMovies = data.Search?.slice(1);
        this.homeProvider.setMovies(splitMovies);
        this.homeProvider.setMoviesResponse(data);
        this.setLoading(false);
      });
    }, 1000);
  }

  setLoading(value: boolean): void {
    this.loadingProvider.setLoading(value);
  }

  loading(): void {
    this.loadingProvider.isLoading().subscribe((value) => {
      this.setLoading(value);
    });
  }

  notImage(): string {
    return 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
  }

  favoriteItemToLocalStorage(movie: IMovie): void {
    localStorage.setItem(movie.imdbID, JSON.stringify(movie));
  }

  isFavorite(movie: IMovie): boolean {
    return localStorage.getItem(movie.imdbID) !== null;
  }

  removeFavorite(movie: IMovie): void {
    localStorage.removeItem(movie.imdbID);
  }

  handleFavorite(movie: IMovie): void {
    if (this.isFavorite(movie)) {
      this.removeFavorite(movie);
    } else {
      this.favoriteItemToLocalStorage(movie);
    }
  }
}

import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IMovie } from './home.interface';
import { LoadingProvider } from '../../components/loading/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { ItemsComponent } from '../../components/items/items.component';
import { HomeProvider } from './home.service';
import { HeaderProvider } from '../../components/header/header.service';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { incrementPage, setPage } from '../../reducers/paginate/paginate.actions';

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
  currentQuery: string = '';
  toaster = inject(ToastrService);
  private store = inject(Store)
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  page$: Observable<number> = this.pageSubject.asObservable();

  constructor(
    private moviesService: MovieService,
    private loadingProvider: LoadingProvider,
    private homeProvider: HomeProvider,
    private headerProvider: HeaderProvider,
    ) {
      this.page$ = this.store.select('paginate');
    }

  ngOnInit(): void {
    combineLatest([this.headerProvider.getQuery(), this.page$])
      .subscribe(([query, page]) => {
        this.query = query;
        let pageValue = page;

        if (query && query !== this.currentQuery) {
          this.store.dispatch(setPage(1));
          pageValue = 1;
        }

        this.currentQuery = query;
        this.searchMovies(this.query, pageValue);
      });
  }


  searchMovies(query?: string, page?: number) {
    this.setLoading(true);
    this.mainMovie = undefined;
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
      },
      (error) => {
        console.error(error);
      })
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
    this.toaster.success('Movie added to favorites');
  }

  isFavorite(movie: IMovie): boolean {
    return localStorage.getItem(movie.imdbID) !== null;
  }

  removeFavorite(movie: IMovie): void {
    localStorage.removeItem(movie.imdbID);
    this.toaster.success('Movie removed from favorites');
  }

  handleFavorite(movie: IMovie): void {
    if (this.isFavorite(movie)) {
      this.removeFavorite(movie);
    } else {
      this.favoriteItemToLocalStorage(movie);
    }
  }
}

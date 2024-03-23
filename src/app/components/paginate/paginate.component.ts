import { Component, inject } from '@angular/core';
import { IMovie, IMovieResponse } from '../../pages/home/home.interface';
import { HomeProvider } from '../../pages/home/home.service';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { decrementPage, incrementPage, setPage } from '../../reducers/paginate/paginate.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paginate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss'
})
export class PaginateComponent {
  toaster = inject(ToastrService);
  responseMovies: IMovieResponse | undefined = undefined;
  movies: IMovie[] | never[] = [];
  private store = inject(Store)
  private pageSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  page$: Observable<number> = this.pageSubject.asObservable();
  page: number = 1;

  constructor(
    private homeProvider: HomeProvider,
  ) {
      this.page$ = this.store.select('paginate');
  }

  ngOnInit(): void {
    this.homeProvider.getMovies().subscribe((movies: IMovie[] | never[]) => {
      this.movies = movies;
    });

    this.homeProvider.getMoviesResponse().subscribe((response: any) => {
      this.responseMovies = response;
    });

    this?.page$.subscribe((page) => {
      this.page = page;
    });
  }

  totalPages(): number {
    if (this.responseMovies?.totalResults === undefined) return 0;
    return Math.ceil(Number(this.responseMovies.totalResults) / 10);
  }

  nextPage(): void {
    if (this.responseMovies?.totalResults === undefined) return;
    if ((Number(this.responseMovies.totalResults)/10) > this.page) {
      this.store.dispatch(incrementPage());
    } else {
      this.toaster.error('You are on the last page');
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.store.dispatch(decrementPage());
    } else {
      this.toaster.error('You are on the first page');
    }
  }

  setPage(value: number): void {
    this.store.dispatch(setPage(value));
  }
}

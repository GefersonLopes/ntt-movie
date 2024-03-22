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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatIconModule,
    ItemsComponent
  ],
  providers: [MovieService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  mainMovie: IMovie | undefined;
  constructor(
    private moviesService: MovieService,
    private loadingProvider: LoadingProvider,
    private homeProvider: HomeProvider,
    private paginateProvider: PaginateProvider,
    ) { }

  ngOnInit(): void {
    this.searchMovies();
    this.paginateProvider.getPage().subscribe((page: number) => {
      this.searchMovies(undefined, page);
      console.log('page', page);
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
        console.log('movies', splitMovies);
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
}

import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IMovie } from './home.interface';
import { LoadingProvider } from '../../components/loading/loading.service';
import { MatIconModule } from '@angular/material/icon';
import { ItemsComponent } from '../../components/items/items.component';
import { HomeProvider } from './home.service';

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
    ) { }

  ngOnInit(): void {
    this.setLoading(true);
    this.searchMovies('minions');
    this.setLoading(false);
  }

  searchMovies(query?: string) {
    this.moviesService.searchMovies(query || 'avengers')
      .subscribe((data: any) => {
        data.Search?.map((movie: IMovie, index: number) => {
          if (index === 0) {
            this.mainMovie = movie;
          }
        });
        const splitMovies = data.Search?.slice(1);
        this.homeProvider.setMovies(splitMovies);
        console.log('movies', splitMovies);
    });
  }

  setLoading(value: boolean): void {
    this.loadingProvider.setLoading(value);
  }

  loading(): void {
    this.loadingProvider.isLoading().subscribe((value) => {
      this.setLoading(value);
    });
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { IMovie } from '../home/home.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { LoadingProvider } from '../../components/loading/loading.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
  ],
  providers: [MovieService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent {
  movieId: string = '';
  movie: any | undefined;

  constructor(
    private router: ActivatedRoute,
    private movieService: MovieService,
    private loadingProvider: LoadingProvider,
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.movieId = params['id'];
      this.getMovie();
    });
  }

  getMovie() {
    this.setLoading(true);
    setTimeout(() => {
      this.movieService.searchMovieById(this.movieId).subscribe((data: any) => {
        this.movie = data;
        this.setLoading(false);
      });
    }, 1000);
  }

  setLoading(value: boolean): void {
    this.loadingProvider.setLoading(value);
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

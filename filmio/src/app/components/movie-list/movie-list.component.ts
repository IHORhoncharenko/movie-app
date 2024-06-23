import { Component, EventEmitter, Output } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { movies } from '../../staticData/movies';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [
    MovieCardComponent,
    RouterLink]
})
export class MovieListComponent {
  @Output() favoriteFilm = new EventEmitter();
  @Output() watchlistFilm = new EventEmitter();

  public moviesList: any[] = movies;
  public filmIdsFav: number[] = [];
  public filmIdsWatch: number[] = [];

  addToFavorites = (movieId: number) => {
    if (!this.filmIdsFav.includes(movieId)) {
      this.filmIdsFav.push(movieId);
    }
    this.favoriteFilm.emit(this.filmIdsFav);
    console.log(this.filmIdsFav);
  }

}

import { Component } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { movies } from '../../staticData/movies';
import { MaterialMovieCardComponent } from "../material-movie-card/material-movie-card.component";
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  imports: [MovieCardComponent, MaterialMovieCardComponent, MatGridListModule]
})
export class MovieListComponent {
  public moviesList: any[] = movies;
  public filmIdsFav: number[] = [];
  public filmIdsWatch: number[] = [];

  addToFavorites = (movieId: number) => {
    if (!this.filmIdsFav.includes(movieId)) {
      this.filmIdsFav.push(movieId);
    }
  }
  addToWatchList = (movieId: number) => {
    if (!this.filmIdsWatch.includes(movieId)) {
      this.filmIdsWatch.push(movieId);
    }
  }





}

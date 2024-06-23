import { Component, Input, OnInit } from '@angular/core';
import { movies } from '../../staticData/movies';
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: 'app-movie-watch-list',
  standalone: true,
  templateUrl: './movie-watch-list.component.html',
  styleUrls: ['./movie-watch-list.component.css'],
  imports: [MovieCardComponent]
})
export class MovieWatchListComponent implements OnInit {

  public moviesList: any[] = movies;
  public watchList: any[] = [];

  @Input()
  watchMovieData: any = {};

  ngOnInit() {

    const storedWatchlist = localStorage.getItem('watchList');

    if (storedWatchlist) {
      this.watchList = JSON.parse(storedWatchlist);
    }


  }

}

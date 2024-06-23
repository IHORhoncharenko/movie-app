import { Component, Input, OnInit } from '@angular/core';
import { movies } from '../../staticData/movies';
import { MovieCardComponent } from "../movie-card/movie-card.component";


@Component({
  selector: 'app-movie-favorite-list',
  standalone: true,
  templateUrl: './movie-favorite-list.component.html',
  styleUrls: ['./movie-favorite-list.component.css'],
  imports: [MovieCardComponent]
})
export class MovieFavoriteListComponent implements OnInit {
  public moviesList: any[] = movies;
  public favoriteList: any[] = [];

  @Input()
  favorMovieData: any = {};

  ngOnInit() {
    // Завантажуємо список улюблених фільмів з localStorage при ініціалізації компонента
    const storedFavorites = localStorage.getItem('favoriteList');

    if (storedFavorites) {
      this.favoriteList = JSON.parse(storedFavorites);
    }

    console.log('Favorite list:', this.favoriteList);
  }
}

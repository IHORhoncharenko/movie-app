import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { Movie } from "../../models/movie.models";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-movie-favorite-list-page",
  standalone: true,
  imports: [ButtonModule, MovieCardComponent],
  templateUrl: "./movie-favorite-list-page.component.html",
  styleUrls: ["./movie-favorite-list-page.component.css"],
})
export class MovieFavoriteListPageComponent implements OnInit {
  public favoritesMovies: Movie[] | undefined;
  public isClearList = false;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.favoritesMovies = this.movieService.getFavoritesMovies();
  }

  clearFavoritelist = () => {
    this.isClearList = true;
    this.movieService.clearFavoritesMovies();
  };
}

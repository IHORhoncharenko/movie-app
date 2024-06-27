import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-movie-favorite-list-page",
  standalone: true,
  imports: [ButtonModule, MovieCardComponent],
  templateUrl: "./movie-favorite-list-page.component.html",
  styleUrls: ["./movie-favorite-list-page.component.css"],
})
export class MovieFavoriteListPageComponent implements OnInit {
  public favoritesMoviesId: any = [];
  public allMovies: any = [];
  public favoritesMovies: any = [];
  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.favoritesMoviesId = this.movieService.setFavoritesMovies();
    this.allMovies = this.movieService.getMovies();

    this.allMovies.forEach((m: any) => {
      this.favoritesMoviesId.forEach((f: any) => {
        if (String(m.id) === String(f)) {
          this.favoritesMovies.push(m);
        }
      });
    });
  }

  clearFavoriteList = () => {
    this.favoritesMovies = [];
  };
}

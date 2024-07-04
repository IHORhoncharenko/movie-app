import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-movie-watch-list-page",
  standalone: true,
  templateUrl: "./movie-watch-list-page.component.html",
  styleUrls: ["./movie-watch-list-page.component.css"],
  imports: [ButtonModule, MovieCardComponent],
})
export class MovieWatchListPageComponent implements OnInit {
  public watchlistMoviesId: any = [];
  public allMovies: any = [];
  public watchlistMovies: any = [];
  public isClearList = false;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.watchlistMoviesId = this.movieService.getWatchListMovies();
    this.allMovies = this.movieService.getMovies();

    this.allMovies.forEach((m: any) => {
      this.watchlistMoviesId.forEach((w: any) => {
        if (String(m.id) === String(w)) {
          if (!this.watchlistMovies.includes(m)) {
            this.watchlistMovies.push(m);
          }
        }
      });
    });
  }

  clearWatchlist = () => {
    this.isClearList = true;
    this.movieService.clearWatchListMovies();
  };
}

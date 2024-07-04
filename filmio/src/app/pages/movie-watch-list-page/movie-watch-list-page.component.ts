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
  public watchlistMovies: any = [];
  public isClearList = false;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.watchlistMovies = this.movieService.getWatchListMovies();
  }

  clearWatchlist = () => {
    this.isClearList = true;
    this.movieService.clearWatchListMovies();
  };
}

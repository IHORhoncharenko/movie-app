import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-top-rate-page",
  standalone: true,
  templateUrl: "./top-rate-page.component.html",
  styleUrls: ["./top-rate-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class TopRatePageComponent implements OnInit {
  public topMovies: Movie[] | undefined;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getTopRategMovies().subscribe((data) => {
      this.topMovies = data.results;
      console.log(this.topMovies);
    });
  }
}

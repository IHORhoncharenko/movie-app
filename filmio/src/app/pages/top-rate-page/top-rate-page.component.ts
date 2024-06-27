import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-top-rate-page",
  standalone: true,
  templateUrl: "./top-rate-page.component.html",
  styleUrls: ["./top-rate-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class TopRatePageComponent implements OnInit {
  public movies: any = [];
  public topMovies: any = [];

  constructor(public movieService: MoviesService) {}

  ngOnInit() {
    this.movies.push(this.movieService.getMovies());

    this.movies.forEach((e: any) => {
      [...e].forEach((m) => {
        if (m["category-label"] === "top") {
          this.topMovies.push(m);
        }
      });
    });
  }
}

import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-now-plaing-page",
  standalone: true,
  templateUrl: "./now-plaing-page.component.html",
  styleUrls: ["./now-plaing-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class NowPlaingPageComponent implements OnInit {
  public movies: any = [];
  public nowPlayingMovies: any = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movies.push(this.movieService.getMovies());

    this.movies.forEach((e: any) => {
      [...e].forEach((m) => {
        if (m["category-label"] === "playing") {
          this.nowPlayingMovies.push(m);
        }
      });
    });
  }
}

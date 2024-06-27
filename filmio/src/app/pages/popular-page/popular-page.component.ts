import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-popular-page",
  standalone: true,
  templateUrl: "./popular-page.component.html",
  styleUrls: ["./popular-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class PopularPageComponent implements OnInit {
  public movies: any = [];
  public popularMovies: any = [];

  constructor(public movieService: MoviesService) {}

  ngOnInit() {
    this.movies.push(this.movieService.getMovies());

    this.movies.forEach((e: any) => {
      [...e].forEach((m) => {
        if (m["category-label"] === "popular") {
          this.popularMovies.push(m);
        }
      });
    });
  }
}

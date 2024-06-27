import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-upcoming-page",
  standalone: true,
  templateUrl: "./upcoming-page.component.html",
  styleUrls: ["./upcoming-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class UpcomingPageComponent implements OnInit {
  public movies: any = [];
  public upcomingMovies: any = [];

  constructor(public movieService: MoviesService) {}

  ngOnInit() {
    this.movies.push(this.movieService.getMovies());

    this.movies.forEach((e: any) => {
      [...e].forEach((m) => {
        if (m["category-label"] === "upcoming") {
          this.upcomingMovies.push(m);
        }
      });
    });
  }
}

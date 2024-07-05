import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-upcoming-page",
  standalone: true,
  templateUrl: "./upcoming-page.component.html",
  styleUrls: ["./upcoming-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class UpcomingPageComponent implements OnInit {
  public upcomingMovies: Movie[] | undefined;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getUpcomingMovies().subscribe((data) => {
      this.upcomingMovies = data.results;
      console.log(this.upcomingMovies);
    });
  }
}

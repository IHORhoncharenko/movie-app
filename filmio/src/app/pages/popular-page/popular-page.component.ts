import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-popular-page",
  standalone: true,
  templateUrl: "./popular-page.component.html",
  styleUrls: ["./popular-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class PopularPageComponent implements OnInit {
  public popularMovies: Movie[] | undefined;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getPopularMovies().subscribe((data) => {
      this.popularMovies = data.results;
      console.log(this.popularMovies);
    });
  }
}

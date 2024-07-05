import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-now-plaing-page",
  standalone: true,
  templateUrl: "./now-plaing-page.component.html",
  styleUrls: ["./now-plaing-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class NowPlaingPageComponent implements OnInit {
  public nowPlayingMovies: Movie[] | undefined;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getNowPlayingMovies().subscribe((data) => {
      this.nowPlayingMovies = data.results;
      console.log(this.nowPlayingMovies);
    });
  }
}

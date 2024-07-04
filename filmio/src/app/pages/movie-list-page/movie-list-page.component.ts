import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-movie-list-page",
  standalone: true,
  templateUrl: "./movie-list-page.component.html",
  styleUrls: ["./movie-list-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class MovieListPageComponent implements OnInit {
  public allMovies: any = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.allMovies = this.movieService.getMovies();
    console.log(this.allMovies);
  }
}

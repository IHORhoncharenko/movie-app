import { Component, OnInit } from "@angular/core";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-movie-list-page",
  standalone: true,
  templateUrl: "./movie-list-page.component.html",
  styleUrls: ["./movie-list-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class MovieListPageComponent implements OnInit {
  public allMovies: Movie[] | undefined;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    // Об'єднати всі масиви фільмів в один
    //  Метод flatMap об'єднує масиви результатів з кожного MovieApi в один масив фільмів.
    this.movieService.getAllMovies().subscribe((data) => {
      console.log(`data: ${data}`);
      this.allMovies = data.flatMap((movieApi) => movieApi.results);
      console.log(this.allMovies);
    });
  }
}

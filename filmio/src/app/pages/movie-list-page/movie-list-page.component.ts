import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
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
export class MovieListPageComponent implements OnInit, OnDestroy {
  public allMovies: Movie[] | undefined;
  private subscription: Subscription = new Subscription();

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.subscription = this.movieService.getAllMovies().subscribe((data) => {
      this.allMovies = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }
}

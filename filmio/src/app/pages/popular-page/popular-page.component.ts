import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { MoviesService } from "../../services/movies/movies.service";

@Component({
  selector: "app-popular-page",
  standalone: true,
  templateUrl: "./popular-page.component.html",
  styleUrls: ["./popular-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class PopularPageComponent implements OnInit, OnDestroy {
  public popularMovies: Movie[] | undefined;
  private subscription: Subscription = new Subscription();

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.subscription = this.movieService
      .getPopularMovies()
      .subscribe((data) => {
        this.popularMovies = data.results;
        console.log(this.popularMovies);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }
}

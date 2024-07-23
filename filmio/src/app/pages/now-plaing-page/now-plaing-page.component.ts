import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { MoviesService } from "../../services/movies/movies.service";

@Component({
  selector: "app-now-plaing-page",
  standalone: true,
  templateUrl: "./now-plaing-page.component.html",
  styleUrls: ["./now-plaing-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class NowPlaingPageComponent implements OnInit, OnDestroy {
  public nowPlayingMovies: Movie[] | undefined;
  private subscribe: Subscription = new Subscription();

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.subscribe = this.movieService
      .getNowPlayingMovies()
      .subscribe((data) => {
        this.nowPlayingMovies = data.results;
      });
  }

  ngOnDestroy() {
    if (this.subscribe) {
      console.log("Відписка від Observable");
      this.subscribe.unsubscribe();
    }
  }
}

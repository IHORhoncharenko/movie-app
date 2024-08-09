import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { loadPopularMovies } from "../../store/movie-store/actions";
import { selectLoadPopularMovies } from "../../store/movie-store/selectors";

@Component({
  selector: "app-popular-page",
  standalone: true,
  templateUrl: "./popular-page.component.html",
  styleUrls: ["./popular-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class PopularPageComponent implements OnInit, OnDestroy {
  public popularMovies: Movie[] | undefined | null;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadPopularMovies());

    this.subscription = this.store
      .select(selectLoadPopularMovies)
      .subscribe((movies) => {
        this.popularMovies = movies;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }
}

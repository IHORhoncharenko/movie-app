import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { loadTopMovies } from "../../store/movie-store/actions";
import { selectLoadTopMovies } from "../../store/movie-store/selectors";

@Component({
  selector: "app-top-rate-page",
  standalone: true,
  templateUrl: "./top-rate-page.component.html",
  styleUrls: ["./top-rate-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class TopRatePageComponent implements OnInit, OnDestroy {
  public topMovies: Movie[] | undefined | null;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTopMovies());

    this.subscription = this.store
      .select(selectLoadTopMovies)
      .subscribe((movies) => {
        this.topMovies = movies;
      });
  }
  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }
}

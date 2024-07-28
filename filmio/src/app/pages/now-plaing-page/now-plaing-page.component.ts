import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { loadNowPlaingMovies } from "../../store/movie-store/actions";
import { selectLoadNowPlaingMovies } from "../../store/movie-store/selectors";

@Component({
  selector: "app-now-plaing-page",
  standalone: true,
  templateUrl: "./now-plaing-page.component.html",
  styleUrls: ["./now-plaing-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class NowPlaingPageComponent implements OnInit, OnDestroy {
  public nowPlayingMovies: Movie[] | undefined | null;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadNowPlaingMovies());

    this.subscription = this.store
      .select(selectLoadNowPlaingMovies)
      .subscribe((movies) => {
        this.nowPlayingMovies = movies;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }
}

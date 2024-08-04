import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { loadAllMovies } from "../../store/movie-store/actions";
import { selectLoadAllMovies } from "../../store/movie-store/selectors";

@Component({
  selector: "app-movie-list-page",
  standalone: true,
  templateUrl: "./movie-list-page.component.html",
  styleUrls: ["./movie-list-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class MovieListPageComponent implements OnInit, OnDestroy {
  public allMovies: Movie[] | null | undefined;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadAllMovies());
    this.subscription = this.store
      .select(selectLoadAllMovies)
      .subscribe((movies) => {
        this.allMovies = movies;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { loadUpcomingMovies } from "../../store/movie-store/actions";
import { selectLoadUpcomingMovies } from "../../store/movie-store/selectors";

@Component({
  selector: "app-upcoming-page",
  standalone: true,
  templateUrl: "./upcoming-page.component.html",
  styleUrls: ["./upcoming-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class UpcomingPageComponent implements OnInit {
  public upcomingMovies: Movie[] | undefined | null;
  private subscription: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadUpcomingMovies());

    this.subscription = this.store
      .select(selectLoadUpcomingMovies)
      .subscribe((movies) => {
        this.upcomingMovies = movies;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { filter, switchMap, takeUntil, tap } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { Movie } from "../../models/movie.models";
import {
  selectLoadAllMovies,
  selectSearchMovie,
} from "../../store/movie-store/selectors";

@Component({
  selector: "app-search-page",
  standalone: true,
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.css"],
  imports: [MovieCardComponent],
})
export class SearchPageComponent extends ClearObservable implements OnInit {
  public isSearch: boolean | undefined | null;
  public searchMovieName: string | undefined | null;
  public allMovies: Movie[] | undefined | null;
  public filteredMovies: Movie[] | undefined | null;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store
      .select(selectSearchMovie)
      .pipe(
        takeUntil(this.destroy$),
        filter((movieName) => movieName !== null && movieName !== undefined),
        tap((movieName) => {
          this.searchMovieName = movieName;
        }),
        switchMap(() =>
          this.store.select(selectLoadAllMovies).pipe(
            filter(
              (allMovies) => allMovies !== null && allMovies !== undefined,
            ),
            tap((allMovies) => {
              return (this.allMovies = allMovies);
            }),
          ),
        ),
      )
      .subscribe(() => {
        if (this.allMovies && typeof this.searchMovieName === "string") {
          this.filteredMovies = this.allMovies.filter((movie) =>
            movie.title
              .toLowerCase()
              .includes(this.searchMovieName?.toLowerCase() as string),
          );
          this.isSearch = true;
        } else {
          this.isSearch = false;
        }
      });
  }
}

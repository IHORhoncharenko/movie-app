import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, filter, takeUntil, tap } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { loadTopMovies } from "../../store/movie-store/actions";
import {
  selectGenresMovie,
  selectLoadTopMovies,
  selectSortingMethod,
} from "../../store/movie-store/selectors";

@Component({
  selector: "app-top-rate-page",
  standalone: true,
  templateUrl: "./top-rate-page.component.html",
  styleUrls: ["./top-rate-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class TopRatePageComponent extends ClearObservable implements OnInit {
  public topMovies: Movie[] | undefined | null;
  public isUseSortElements: boolean = false;
  public sortingMovies: Movie[] = [];
  private allGenres: any[] | null | undefined;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(loadTopMovies());

    this.store
      .select(selectLoadTopMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies) => {
        this.topMovies = movies;
      });

    combineLatest([
      this.store.select(selectGenresMovie),
      this.store.select(selectSortingMethod),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([sortBy]) => {
          if (!sortBy) {
            this.isUseSortElements = false;
          }
        }),
        filter(
          ([genres, sortBy]) =>
            sortBy !== null &&
            sortBy !== undefined &&
            genres !== undefined &&
            genres !== null,
        ),
        tap(([genres, sortBy]) => {
          this.isUseSortElements = true;
          this.allGenres = genres;

          if (sortBy.selectedSort === "rating" && this.topMovies) {
            this.sortingMovies = [];

            this.sortingMovies = [...this.topMovies].sort((a, b) => {
              if (a.vote_average > b.vote_average) {
                return 1;
              }
              if (a.vote_average < b.vote_average) {
                return -1;
              }
              return 0;
            });
          }

          if (
            sortBy.selectedSort === "genres" &&
            this.topMovies &&
            this.allGenres
          ) {
            this.sortingMovies = [];

            this.allGenres.forEach((genre) => {
              this.topMovies?.forEach((movie) => {
                [...movie.genre_ids].forEach((id) => {
                  if (genre.id === id && !this.sortingMovies.includes(movie)) {
                    this.sortingMovies.push(movie);
                  }
                });
              });
            });
          }

          if (sortBy.selectedSort === "default") {
            this.isUseSortElements = false;
          }
        }),
      )
      .subscribe();
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { combineLatest, filter, takeUntil, tap } from "rxjs";
import { ClearObservable } from "../../abstract/clear-observers";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Movie } from "../../models/movie.models";
import { loadNowPlaingMovies } from "../../store/movie-store/actions";
import {
  selectGenresMovie,
  selectLoadNowPlaingMovies,
  selectSortingMethod,
} from "../../store/movie-store/selectors";

@Component({
  selector: "app-now-plaing-page",
  standalone: true,
  templateUrl: "./now-plaing-page.component.html",
  styleUrls: ["./now-plaing-page.component.css"],
  imports: [SidebarComponent, MovieCardComponent],
})
export class NowPlaingPageComponent
  extends ClearObservable
  implements OnInit, OnDestroy
{
  public nowPlayingMovies: Movie[] | undefined | null;
  public isUseSortElements: boolean = false;
  public sortingMovies: Movie[] = [];
  private allGenres: any[] | null | undefined;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.store.dispatch(loadNowPlaingMovies());

    this.store
      .select(selectLoadNowPlaingMovies)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movies) => {
        this.nowPlayingMovies = movies;
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

          if (sortBy.selectedSort === "rating" && this.nowPlayingMovies) {
            this.sortingMovies = [];

            this.sortingMovies = [...this.nowPlayingMovies].sort((a, b) => {
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
            this.nowPlayingMovies &&
            this.allGenres
          ) {
            this.sortingMovies = [];

            this.allGenres.forEach((genre) => {
              this.nowPlayingMovies?.forEach((movie) => {
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

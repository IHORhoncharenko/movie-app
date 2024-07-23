import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { Subscription, catchError, forkJoin, tap } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { User } from "../../models/user.models";
import { MoviesService } from "../../services/movies/movies.service";
import { AuthUserService } from "../../services/users/authUser.service.service";

@Component({
  selector: "app-movie-watch-list-page",
  standalone: true,
  templateUrl: "./movie-watch-list-page.component.html",
  styleUrls: ["./movie-watch-list-page.component.css"],
  imports: [ButtonModule, MovieCardComponent],
})
export class MovieWatchListPageComponent implements OnInit {
  public watchlistMovies: any;
  public mesLoadingStatus = false;
  public isClearList = false;
  public watchlistMoviesIds: number[] = [];
  private subscription = new Subscription();
  private userData: User | undefined | void;

  constructor(
    private movieService: MoviesService,
    private authUserService: AuthUserService,
  ) {}

  ngOnInit() {
    this.userData = this.authUserService.getUserDataTMDB();

    if (this.userData) {
      this.mesLoadingStatus = true;

      this.movieService
        .getWatchlistMovies(this.userData.accountId)
        .pipe(
          catchError((error) => {
            alert(`This is very bad bro...${error}`);
            return error;
          }),
          tap(() => {
            this.mesLoadingStatus = false;
          }),
        )
        .subscribe((data) => {
          this.mesLoadingStatus = false;
          this.watchlistMovies = data;
          this.watchlistMovies = this.watchlistMovies.results;
          console.log(this.watchlistMovies);
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }

  clearMoviesList = () => {
    this.watchlistMoviesIds = this.watchlistMovies.map((m: any) => m.id);
    let observables: any = [];

    if (this.userData) {
      observables = this.watchlistMoviesIds.map((id: any) => {
        if (this.userData) {
          return this.movieService.clearMovieFromWatchlist(
            this.userData.accountId,
            id,
          );
        } else {
          return undefined;
        }
      });

      forkJoin(observables).subscribe((data) => {
        this.watchlistMovies = [];
        console.log(data);
      });
    }
  };
}

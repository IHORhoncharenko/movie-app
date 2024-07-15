import { Component, OnInit } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from "primeng/messages";
import { Subscription, catchError, forkJoin, tap } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { User } from "../../models/user.models";
import { MoviesService } from "../../services/movies/movies.service";
import { AuthUserService } from "../../services/users/authUser.service.service";

@Component({
  selector: "app-movie-favorite-list-page",
  standalone: true,
  imports: [ButtonModule, MovieCardComponent, MessagesModule],
  templateUrl: "./movie-favorite-list-page.component.html",
  styleUrls: ["./movie-favorite-list-page.component.css"],
})
export class MovieFavoriteListPageComponent implements OnInit {
  public favoritesMovies: any;
  public favoritesMoviesIds: number[] = [];
  public mesLoadingStatus = false;
  private userData: User | undefined | void;
  private subscription = new Subscription();

  constructor(
    private movieService: MoviesService,
    private authUserService: AuthUserService,
  ) {}

  ngOnInit() {
    this.userData = this.authUserService.getUserDataTMDB();

    if (this.userData) {
      this.mesLoadingStatus = true;

      this.movieService
        .getFavoriteMovies(this.userData.accountId)
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
          this.favoritesMovies = data;
          this.favoritesMovies = this.favoritesMovies.results;
          console.log(this.favoritesMovies);
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
    this.favoritesMoviesIds = this.favoritesMovies.map((m: any) => m.id);
    let observables: any = [];

    if (this.userData) {
      observables = this.favoritesMoviesIds.map((id: any) => {
        if (this.userData) {
          return this.movieService.clearMovieFromFavoriteList(
            this.userData.accountId,
            id,
          );
        } else {
          return undefined;
        }
      });

      forkJoin(observables).subscribe((data) => {
        this.favoritesMovies = [];
        console.log(data);
      });
    }
  };
}

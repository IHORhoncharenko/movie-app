import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { MessagesModule } from "primeng/messages";
import { Subscription, switchMap, tap } from "rxjs";
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { getFavoriteMovies } from "../../store/movie-store/actions";
import { selectorGetFavoriteMovies } from "../../store/movie-store/selectors";
import { selectorGetAccountId } from "../../store/user-store/user-selectors";

@Component({
  selector: "app-movie-favorite-list-page",
  standalone: true,
  imports: [ButtonModule, MovieCardComponent, MessagesModule],
  templateUrl: "./movie-favorite-list-page.component.html",
  styleUrls: ["./movie-favorite-list-page.component.css"],
})
export class MovieFavoriteListPageComponent implements OnInit {
  public favoriteMovies: any = [];
  public favoritesMoviesIds: number[] = [];
  public mesLoadingStatus = false;
  private subscription = new Subscription();
  private accountId: any | null | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(selectorGetAccountId)
      .pipe(
        tap((data: any) => {
          this.accountId = data;
        }),
        switchMap(() => {
          this.store.dispatch(getFavoriteMovies(this.accountId));
          return this.store.select(selectorGetFavoriteMovies);
        }),
      )
      .subscribe((data) => {
        this.favoriteMovies = data;
      });

    // this.userData = this.authUserService.getUserDataTMDB();

    // if (this.userData) {
    //   this.mesLoadingStatus = true;

    //   this.movieService
    //     .getFavoriteMovies(this.userData.accountId)
    //     .pipe(
    //       catchError((error) => {
    //         alert(`This is very bad bro...${error}`);
    //         return error;
    //       }),
    //       tap(() => {
    //         this.mesLoadingStatus = false;
    //       }),
    //     )
    //     .subscribe((data) => {
    //       this.mesLoadingStatus = false;
    //       this.favoritesMovies = data;
    //       this.favoritesMovies = this.favoritesMovies.results;
    //       console.log(this.favoritesMovies);
    //     });
    // }
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log("Відписка від Observable");
      this.subscription.unsubscribe();
    }
  }

  clearMoviesList = () => {
    // this.favoritesMoviesIds = this.favoritesMovies.map((m: any) => m.id);
    // let observables: any = [];
    // if (this.userData) {
    //   observables = this.favoritesMoviesIds.map((id: any) => {
    //     if (this.userData) {
    //       return this.movieService.clearMovieFromFavoriteList(
    //         this.userData.accountId,
    //         id,
    //       );
    //     } else {
    //       return undefined;
    //     }
    //   });
    //   forkJoin(observables).subscribe((data) => {
    //     this.favoritesMovies = [];
    //     console.log(data);
    //   });
    // }
  };
}

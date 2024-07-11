import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { TabViewModule } from "primeng/tabview";
import { ToggleButtonModule } from "primeng/togglebutton";
import { Subscription } from "rxjs";
import { Movie } from "../../models/movie.models";
import { User } from "../../models/user.models";
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";
import { SafeUrlPipe } from "../../pipes/safeUrl/safeUrl.pipe";
import { MoviesService } from "../../services/movies/movies.service";
import { AuthUserService } from "../../services/users/authUser.service.service";

@Component({
  selector: "app-movie-card-page",
  standalone: true,
  imports: [
    RouterLink,
    ButtonModule,
    ToggleButtonModule,
    FormsModule,
    ConvertingMinutesToHoursPipe,
    RatingModule,
    FormsModule,
    BadgeModule,
    TabViewModule,
    ButtonModule,
    SafeUrlPipe,
  ],
  templateUrl: "./movie-card-page.component.html",
  styleUrls: ["./movie-card-page.component.css"],
})
export class MovieCardPageComponent implements OnInit, OnDestroy {
  public movieDetailseData: Movie | undefined;
  public value: number | undefined;
  public isShowrating = false;
  public isShowYoutube = false;
  public correctUrlPoster: any;
  public allMovies: Movie[] | undefined;
  public isFamilyFriendly: boolean | undefined;
  public urlPoster: string | undefined;
  private subscription: Subscription = new Subscription();
  private userData: User | undefined | void;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
    private authUserService: AuthUserService,
  ) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      const movieId = Number(params["id"]);

      this.movieService.getMovieById(movieId).subscribe((data) => {
        this.movieDetailseData = data;

        if (this.movieDetailseData) {
          this.value = Math.round(Number(this.movieDetailseData.vote_average));

          this.urlPoster = `https://media.themoviedb.org/t/p/w220_and_h330_face${this.movieDetailseData.poster_path}`;

          if (this.movieDetailseData.adult === false) {
            this.isFamilyFriendly = true;
          } else {
            this.isFamilyFriendly = false;
          }
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      console.log(`Відписка від Observable`);
      this.subscription.unsubscribe();
    }
  }

  mouseenter = () => {
    this.isShowrating = true;
  };

  mouseover = () => {
    this.isShowrating = false;
  };

  showPlayerYouTube = () => {
    this.isShowYoutube = true;
  };

  choosingFavoriteMovie = (movieId: number) => {
    this.userData = this.authUserService.getUserData();

    if (this.userData && this.movieDetailseData) {
      console.log(`
        userData --- ${JSON.stringify(this.userData)}
        movie --- ${JSON.stringify(this.movieDetailseData)}
        `);
      this.movieService
        .addToFavorite(this.userData.accountId, movieId)
        .subscribe((response) => {
          console.log(response);
        });
    }
  };

  choosingWatchlistMovie = (movieId: number) => {
    this.userData = this.authUserService.getUserData();

    if (this.userData && this.movieDetailseData) {
      console.log(`
        userData --- ${JSON.stringify(this.userData)}
        movie --- ${JSON.stringify(this.movieDetailseData)}
        `);
      this.movieService
        .addToWatchlist(this.userData.accountId, movieId)
        .subscribe((response) => {
          console.log(response);
        });
    }
  };
}

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
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";
import { SafeUrlPipe } from "../../pipes/safeUrl/safeUrl.pipe";
import { MoviesService } from "../../services/movies.service";

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
  private token: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MoviesService,
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
    this.movieService.setFavoritesMoviesId(movieId);
  };
  choosingToWatchListMovie = (movieId: number) => {
    this.movieService.setWatchListMoviesId(movieId);
  };

  postTestFav = (movieId: any) => {
    this.movieService.getToken().subscribe((response) => {
      let authSessionUrl = `${response.headers.get("Authentication-Callback")}`;
      this.token = response.body;
      this.token = this.token.request_token;
      window.open(authSessionUrl, "_blank");
      console.log(authSessionUrl);
      console.log(this.token);
      console.log(this.route);
    });
  };
}

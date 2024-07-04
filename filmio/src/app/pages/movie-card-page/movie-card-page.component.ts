import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { TabViewModule } from "primeng/tabview";
import { ToggleButtonModule } from "primeng/togglebutton";
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
export class MovieCardPageComponent implements OnInit {
  public movieDetailseData: any = {};
  public value: number | undefined;
  public isShowrating = false;
  public isShowYoutube = false;
  public correctUrlPoster: any;
  public allMovies: any = [];

  constructor(
    private route: ActivatedRoute,
    private movieServices: MoviesService,
  ) {}

  ngOnInit(): void {
    this.allMovies.push(this.movieServices.getMovies());
    this.allMovies = this.allMovies[0];
    console.log(this.allMovies);

    this.route.params.subscribe((params) => {
      const movieId = params["id"];
      this.movieDetailseData =
        this.allMovies.find((movie: any) => movie.id === Number(movieId)) || {};
    });

    this.value = Math.round(Number(this.movieDetailseData.rating));
    let url = this.movieDetailseData.trailer;
    let urlTrailerId = url.split("/").reverse();
    this.correctUrlPoster = ` https://i.ytimg.com/vi/${urlTrailerId[0]}/sddefault.jpg`;
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

  choosingFavoriteMovie = (movieId: any) => {
    this.movieServices.setFavoritesMovies(movieId);
  };
  choosingToWatchListMovie = (movieId: any) => {
    this.movieServices.setWatchListMovies(movieId);
  };
}

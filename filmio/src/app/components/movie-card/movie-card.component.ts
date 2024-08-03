import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { RatingModule } from "primeng/rating";
import { TagModule } from "primeng/tag";
import { map } from "rxjs";
import { environment } from "../../environments/environment";
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";
import { loadSelectedMovie } from "../../store/movie-store/actions";
import { selectGenresMovie } from "../../store/movie-store/selectors";

@Component({
  selector: "app-movie-card",
  standalone: true,
  templateUrl: "./movie-card.component.html",
  styleUrls: ["./movie-card.component.css"],
  imports: [
    ConvertingMinutesToHoursPipe,
    RouterLink,
    DialogModule,
    ButtonModule,
    CardModule,
    BadgeModule,
    FormsModule,
    RatingModule,
    TagModule,
  ],
})
export class MovieCardComponent {
  @Input()
  movieData: any = {};

  public isShowRating = false;
  public value: number | undefined | null;
  public isLink = false;
  public isVisible = false;
  public isFamilyFriendly: boolean | undefined | null;
  public movieGenres: any = [];
  public correctUrlPoster: string | undefined | null;
  private urlPoster = environment.apiUrlPosterTMDB;

  constructor(
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit() {
    this.value = Math.round(Number(this.movieData.vote_average / 2));
    this.correctUrlPoster = `${this.urlPoster}${this.movieData.poster_path}`;

    if (this.movieData.adult === false) {
      this.isFamilyFriendly = true;
    } else {
      this.isFamilyFriendly = false;
    }

    this.store
      .select(selectGenresMovie)
      .pipe(
        map((data) => {
          data.map((genreApi: any) => {
            this.movieData.genre_ids.map((genreMovie: any) => {
              if (genreApi.id === genreMovie) {
                this.movieGenres.push(genreApi.name);
              }
            });
          });
        }),
      )
      .subscribe();
  }

  showDialog() {
    this.isVisible = true;
  }

  mouseenter = () => {
    this.isShowRating = true;
  };

  mouseover = () => {
    this.isShowRating = false;
  };

  showLink = () => {
    this.isLink = true;
  };

  hideLink = () => {
    this.isLink = false;
  };

  openMovieCard = () => {
    this.router.navigateByUrl(`/movie/${this.movieData.id}`);
  };

  selectMovie = () => {
    this.store.dispatch(loadSelectedMovie({ selectedMovie: this.movieData }));
  };
}

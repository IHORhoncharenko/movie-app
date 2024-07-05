import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { RatingModule } from "primeng/rating";
import { TagModule } from "primeng/tag";
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";

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
  public value: number | undefined;
  public isLink = false;
  public isVisible = false;
  public isFamilyFriendly: boolean | undefined;
  public urlPoster: string | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.value = Math.round(Number(this.movieData.vote_average / 2));
    this.urlPoster = `https://media.themoviedb.org/t/p/w220_and_h330_face${this.movieData.poster_path}`;

    if (this.movieData.adult === false) {
      this.isFamilyFriendly = true;
    } else {
      this.isFamilyFriendly = false;
    }
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
}

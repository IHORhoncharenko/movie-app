import { Component, EventEmitter, Input, Output } from "@angular/core";
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
  @Output() addFavourite = new EventEmitter();
  @Output() addWatchList = new EventEmitter();

  public isShowrating = false;
  public value: number | undefined;
  public isLink = false;

  addToFavourite = () => {
    this.addFavourite.emit(this.movieData.id);
  };

  addToWatchList = () => {
    this.addWatchList.emit(this.movieData.id);
  };

  constructor(private router: Router) {}

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  mouseenter = () => {
    this.isShowrating = true;
  };

  mouseover = () => {
    this.isShowrating = false;
  };

  showLink = () => {
    this.isLink = true;
  };

  hideLink = () => {
    this.isLink = false;
  };

  ngOnInit() {
    this.value = Math.round(Number(this.movieData.rating / 2));
  }

  openMovieCard = () => {
    // Використовуємо програмну навігацію для встановлення основного маршруту
    this.router.navigateByUrl(`/movie/${this.movieData.id}`).then(() => {
      // Додаємо маршрут для іменованого аутлета без зміни URL
      this.router.navigate(
        [{ outlets: { card: ["movie", this.movieData.id] } }],
        { skipLocationChange: true },
      );
    });
  };
}

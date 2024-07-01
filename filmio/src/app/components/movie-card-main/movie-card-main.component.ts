import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BadgeModule } from "primeng/badge";
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";
import { TabViewModule } from "primeng/tabview";
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";
import { SafeUrlPipe } from "../../pipes/safeUrl/safeUrl.pipe";
import { MoviesService } from "../../services/movies.service";

@Component({
  selector: "app-movie-card-main",
  standalone: true,
  templateUrl: "./movie-card-main.component.html",
  styleUrls: ["./movie-card-main.component.css"],
  imports: [
    ConvertingMinutesToHoursPipe,
    RatingModule,
    FormsModule,
    BadgeModule,
    TabViewModule,
    ButtonModule,
    SafeUrlPipe,
  ],
})
export class MovieCardMainComponent {
  @Input() movieData: any = {};
  public value: number | undefined;
  public isShowrating = false;
  public isShowYoutube = false;
  public correctUrlPoster: any;
  constructor(public movieService: MoviesService) {}

  ngOnInit() {
    this.value = Math.round(Number(this.movieData.rating));

    let url = this.movieData.trailer;
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
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { BadgeModule } from 'primeng/badge';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { SafeUrlPipe } from '../../pipes/safeUrl/safeUrl.pipe';


@Component({
  selector: 'app-movie-card-main',
  standalone: true,
  templateUrl: './movie-card-main.component.html',
  styleUrls: ['./movie-card-main.component.css'],
  imports: [
    ConvertingMinutesToHoursPipe,
    RatingModule,
    FormsModule,
    BadgeModule,
    TabViewModule,
    ButtonModule,
    SafeUrlPipe
  ]
})
export class MovieCardMainComponent {
  @Output() favFilm = new EventEmitter();
  @Output() watchFilm = new EventEmitter();
  @Input() movieData: any = {};

  public value: number | undefined;
  public isShowrating = false;
  public isShowYoutube = false;
  public correctUrlPoster: any;
  public isFavorite = false;
  public isWatch = false;

  ngOnInit() {
    this.value = Math.round(Number(this.movieData.rating));

    let url = this.movieData.trailer;
    let urlTrailerId = url.split('/').reverse();
    this.correctUrlPoster = ` https://i.ytimg.com/vi/${urlTrailerId[0]}/sddefault.jpg`;
    console.log(this.correctUrlPoster)

  }

  addToFavourite() {
    this.favFilm.emit(this.movieData.id);
    this.isFavorite = !this.isFavorite;
    console.log(`click to favorittes id: ${this.movieData.id}`)
  }

  addToWatch() {
    this.watchFilm.emit(this.movieData.id);
    this.isWatch = !this.isWatch;
    console.log(`click to watch id: ${this.movieData.id}`)
  }

  mouseenter = () => {
    this.isShowrating = true;
  }

  mouseover = () => {
    this.isShowrating = false;
  }

  showPlayerYouTube = () => {
    this.isShowYoutube = true;
  }

}




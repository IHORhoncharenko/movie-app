import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
  imports: [ConvertingMinutesToHoursPipe]
})
export class MovieCardComponent {

  @Input()
  movieData: any = {};
  @Output() addFavourite = new EventEmitter();
  @Output() addWatchList = new EventEmitter();

  addToFavourite = () => {
    this.addFavourite.emit(this.movieData.id)
  }

  addToWatchList = () => {
    this.addWatchList.emit(this.movieData.id)
  }

}

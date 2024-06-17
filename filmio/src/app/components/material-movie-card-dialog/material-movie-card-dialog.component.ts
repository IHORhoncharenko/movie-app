import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";

@Component({
  selector: 'app-material-movie-card-dialog',
  standalone: true,
  templateUrl: './material-movie-card-dialog.component.html',
  styleUrls: ['./material-movie-card-dialog.component.css'],
  imports: [ConvertingMinutesToHoursPipe]
})
export class MaterialMovieCardDialogComponent {
  @Input()
  movieDataPopup: any = {};
  @Output() showData = new EventEmitter();

  showDataFilm = () => {
    this.showData.emit(this.movieDataPopup.id)
  }

  ngOnInit() { console.log(this.movieDataPopup) }

}

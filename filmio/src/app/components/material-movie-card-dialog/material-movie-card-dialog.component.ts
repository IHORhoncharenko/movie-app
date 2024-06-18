import { Component, Inject } from '@angular/core';
import { ConvertingMinutesToHoursPipe } from "../../pipes/convertingMinutesToHours/convertingMinutesToHours.pipe";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-material-movie-card-dialog',
  standalone: true,
  templateUrl: './material-movie-card-dialog.component.html',
  styleUrls: ['./material-movie-card-dialog.component.css'],
  imports: [ConvertingMinutesToHoursPipe]
})
export class MaterialMovieCardDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}

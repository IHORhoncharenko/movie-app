import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MaterialMovieCardDialogComponent } from '../material-movie-card-dialog/material-movie-card-dialog.component';
import { movies } from '../../staticData/movies';

@Component({
  selector: 'app-material-movie-card',
  standalone: true,
  templateUrl: './material-movie-card.component.html',
  styleUrls: ['./material-movie-card.component.css'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatDialogModule,
    MaterialMovieCardDialogComponent
  ]
})
export class MaterialMovieCardComponent {
  @Input()
  movieData: any = {};
  @Output() addFavourite = new EventEmitter();
  @Output() addWatchList = new EventEmitter();

  public moviesListPopup: any[] = movies;
  public filmIdsPopup: number[] = [];

  addToFavourite = () => {
    this.addFavourite.emit(this.movieData.id)
  }

  addToWatchList = () => {
    this.addWatchList.emit(this.movieData.id)
  }

  constructor(public dialog: MatDialog) { }

  openDialog = () => {
    this.dialog.open(MaterialMovieCardDialogComponent, {
      width: '500px',
      height: 'auto'
    });
  }

  showDataFilm = (movieDataId: number) => {
    this.filmIdsPopup.push(movieDataId);
    console.log(this.filmIdsPopup);
  }

}

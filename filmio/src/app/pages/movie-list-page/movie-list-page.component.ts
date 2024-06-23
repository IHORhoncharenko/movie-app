import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MovieFavoriteListComponent } from '../../components/movie-favorite-list/movie-favorite-list.component';
import { MovieWatchListComponent } from '../../components/movie-watch-list/movie-watch-list.component';

@Component({
  selector: 'app-movie-list-page',
  standalone: true,
  imports: [
    MovieListComponent,
    SidebarComponent,
    MovieFavoriteListComponent,
    MovieWatchListComponent
  ],
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.css']
})
export class MovieListPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MovieListComponent } from "../../components/movie-list/movie-list.component";
import { movies } from '../../staticData/movies';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";

@Component({
  selector: 'app-upcoming-page',
  standalone: true,
  templateUrl: './upcoming-page.component.html',
  styleUrls: ['./upcoming-page.component.css'],
  imports: [
    SidebarComponent,
    MovieListComponent,
    MovieCardComponent
  ]
})
export class UpcomingPageComponent implements OnInit {

  public movieList = movies;

  constructor() { }

  ngOnInit() {
  }

}

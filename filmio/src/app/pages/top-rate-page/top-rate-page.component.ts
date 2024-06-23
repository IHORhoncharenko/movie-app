import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MovieListComponent } from "../../components/movie-list/movie-list.component";
import { movies } from '../../staticData/movies';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";

@Component({
  selector: 'app-top-rate-page',
  standalone: true,
  templateUrl: './top-rate-page.component.html',
  styleUrls: ['./top-rate-page.component.css'],
  imports: [
    SidebarComponent,
    MovieListComponent,
    MovieCardComponent
  ]
})
export class TopRatePageComponent implements OnInit {

  public movieList = movies;

  constructor() { }

  ngOnInit() {
  }

}

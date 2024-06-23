import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { movies } from '../../staticData/movies';

@Component({
  selector: 'app-now-plaing-page',
  standalone: true,
  templateUrl: './now-plaing-page.component.html',
  styleUrls: ['./now-plaing-page.component.css'],
  imports: [
    SidebarComponent,
    MovieListComponent,
    MovieCardComponent
  ]
})
export class NowPlaingPageComponent implements OnInit {

  public movieList = movies;

  constructor() { }

  ngOnInit() {
  }

}

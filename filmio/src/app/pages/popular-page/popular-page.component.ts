import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MovieListComponent } from "../../components/movie-list/movie-list.component";
import { movies } from '../../staticData/movies';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";

@Component({
  selector: 'app-popular-page',
  standalone: true,
  templateUrl: './popular-page.component.html',
  styleUrls: ['./popular-page.component.css'],
  imports: [
    SidebarComponent,
    MovieListComponent,
    MovieCardComponent
  ]
})
export class PopularPageComponent implements OnInit {

  public movieList = movies;

  constructor() { }

  ngOnInit() {
  }

}

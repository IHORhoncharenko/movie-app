import { Component, OnInit } from '@angular/core';
import { MovieWatchListComponent } from "../../components/movie-watch-list/movie-watch-list.component";
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movie-watch-list-page',
  standalone: true,
  templateUrl: './movie-watch-list-page.component.html',
  styleUrls: ['./movie-watch-list-page.component.css'],
  imports: [
    MovieWatchListComponent,
    ButtonModule
  ]
})
export class MovieWatchListPageComponent implements OnInit {

  public queryParam: any
  public isClear = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryParam = params;
      console.log(this.queryParam);
    });
  }

  removeLocalStorage = () => {
    localStorage.clear();
    this.isClear = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { MovieFavoriteListComponent } from '../../components/movie-favorite-list/movie-favorite-list.component';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-movie-favorite-list-page',
  standalone: true,
  imports: [
    MovieFavoriteListComponent,
    ButtonModule
  ],
  templateUrl: './movie-favorite-list-page.component.html',
  styleUrls: ['./movie-favorite-list-page.component.css']
})
export class MovieFavoriteListPageComponent implements OnInit {
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

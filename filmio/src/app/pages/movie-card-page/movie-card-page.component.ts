import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { ToggleButtonModule } from "primeng/togglebutton";
import { MovieCardMainComponent } from "../../components/movie-card-main/movie-card-main.component";
import { movies } from "../../staticData/movies";

@Component({
  selector: "app-movie-card-page",
  standalone: true,
  imports: [
    MovieCardMainComponent,
    RouterLink,
    ButtonModule,
    ToggleButtonModule,
    FormsModule,
  ],
  templateUrl: "./movie-card-page.component.html",
  styleUrls: ["./movie-card-page.component.css"],
})
export class MovieCardPageComponent implements OnInit {
  public moviesData: any[] = movies;
  public movieDetailseData: any = {};
  public idFavData: any[] = [];
  public idWatchData: any[] = [];
  public idStringFavor: any;
  public idStringWatch: any;
  public checked: boolean = false;
  public favoriteList: any[] = [];
  public watchList: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = params["id"];
      this.movieDetailseData =
        this.moviesData.find((movie) => movie.id === Number(movieId)) || {};
    });

    const storedFavorites = localStorage.getItem("favoriteList");
    const storedWatchlist = localStorage.getItem("watchList");

    if (storedFavorites) {
      this.favoriteList = JSON.parse(storedFavorites);
    }

    if (storedWatchlist) {
      this.watchList = JSON.parse(storedWatchlist);
    }
  }

  getDataFilm = (data: any) => {
    this.idFavData = data;

    if (!this.favoriteList.includes(String(this.idFavData))) {
      this.favoriteList.push(String(this.idFavData));
    }

    localStorage.setItem("favoriteList", JSON.stringify(this.favoriteList));
    console.log(`favoriteList: ${this.favoriteList}`);
  };

  getDataWatchFilm = (data: any) => {
    this.idWatchData = data;

    if (!this.watchList.includes(String(this.idWatchData))) {
      this.watchList.push(String(this.idWatchData));
    }

    localStorage.setItem("watchList", JSON.stringify(this.watchList));
    console.log(`watchlist: ${this.watchList}`);
  };
}

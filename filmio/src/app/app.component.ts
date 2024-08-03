import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { filter, tap } from "rxjs";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { LoginPopupComponent } from "./components/login-popup/login-popup/login-popup.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SubscribePopupComponent } from "./components/subscribe-popup/subscribe-popup.component";
import { loadGenresForMovies } from "./store/movie-store/actions";
import { selectSearchMovie } from "./store/movie-store/selectors";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    RouterOutlet,
    SidebarComponent,
    RouterModule,
    CatalogComponent,
    LoginPopupComponent,
    SubscribePopupComponent,
  ],
})
export class AppComponent implements OnInit {
  public isSearchMovie = false;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadGenresForMovies());
    this.store
      .select(selectSearchMovie)
      .pipe(
        filter((movieName) => movieName !== null && movieName !== undefined),
        tap((movieName) => {
          this.isSearchMovie = true;
        }),
      )
      .subscribe();
  }
}

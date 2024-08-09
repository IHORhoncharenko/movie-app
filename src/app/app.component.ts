import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { LoginPopupComponent } from "./components/login-popup/login-popup/login-popup.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { SortComponent } from "./components/sort/sort.component";
import { SubscribePopupComponent } from "./components/subscribe-popup/subscribe-popup.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { loadGenresForMovies } from "./store/movie-store/actions";

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
    SearchPageComponent,
    SortComponent,
  ],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadGenresForMovies());
  }
}

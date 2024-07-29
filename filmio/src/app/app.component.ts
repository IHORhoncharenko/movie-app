import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { switchMap, tap } from "rxjs";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { loadGenresForMovies } from "./store/movie-store/actions";
import {
  loadRequestToken,
  loadUserAccountId,
  loadUserSessionId,
  loadValidRequestToken,
} from "./store/user-store/user-actions";
import {
  selectAccountId,
  selectRequestToken,
  selectSessionId,
  selectValidRequestToken,
} from "./store/user-store/user-selectors";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, SidebarComponent, RouterModule, CatalogComponent],
})
export class AppComponent implements OnInit {
  private requestToken: string | null | undefined;
  private sessionID: string | null | undefined;
  private accountID: string | number | null | undefined;
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadGenresForMovies());
    this.store.dispatch(loadRequestToken());
    this.store
      .select(selectRequestToken)
      .pipe(
        switchMap((requestToken) => {
          this.requestToken = requestToken;
          this.requestToken;
          this.store.dispatch(
            loadValidRequestToken({ requestToken: requestToken }),
          );
          //припустимо, що після валідації, requestToken може змінитись на інший
          return this.store.select(selectValidRequestToken).pipe(
            switchMap((validRequestToken) => {
              this.requestToken = validRequestToken;
              this.store.dispatch(
                loadUserSessionId({
                  requestToken: this.requestToken,
                }),
              );
              return this.store.select(selectSessionId).pipe(
                switchMap((sessionID) => {
                  this.sessionID = sessionID;
                  this.store.dispatch(
                    loadUserAccountId({ sessionID: this.sessionID }),
                  );
                  return this.store.select(selectAccountId).pipe(
                    tap((accountID) => {
                      this.accountID = accountID;
                    }),
                  );
                }),
              );
            }),
          );
        }),
      )
      .subscribe((data) => {
        console.log(`
              requestToken >>> ${JSON.stringify(this.requestToken)}
              sessionID >>> ${JSON.stringify(this.sessionID)}
              acountID >>> ${JSON.stringify(this.accountID)}
          `);
      });
  }
}

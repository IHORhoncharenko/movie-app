import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { retry, tap } from "rxjs";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { getGenresForMovies } from "./store/movie-store/actions";
import {
  getRequestToken,
  getUserAccountId,
  getUserSessionId,
  getValidRequestToken,
} from "./store/user-store/user-actions";
import {
  selectorGetRequestToken,
  selectorGetSessionId,
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
  private isValidationToken: boolean = false;
  private sessionID: string | null | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    //Інга, підкажіть будь-ласка, чому такий варіант не працює, що я закоментував.

    // const requestToken$ = of(this.store.dispatch(getRequestToken()));
    // const validRequestToken$ = of(
    //   this.store.dispatch(
    //     getValidRequestToken({ requestToken: this.requestToken }),
    //   ),
    // );
    // const sessionId$ = of(
    //   this.store.dispatch(
    //     getUserSessionId({ requestToken: this.requestToken }),
    //   ),
    // );
    // const accountId$ = of(
    //   this.store.dispatch(getUserAccountId({ sessionID: this.sessionID })),
    // );

    // requestToken$
    //   .pipe(
    //     switchMap(() => {
    //       return this.store.select(selectorGetRequestToken);
    //     }),
    //     tap(() => {
    //       console.log("Get Request Token...");
    //     }),
    //     retry(10),
    //     switchMap((data) => {
    //       this.requestToken = data;
    //       return validRequestToken$;
    //     }),
    //     tap(() => {
    //       console.log("get valid request token...");
    //     }),
    //     retry(10),
    //     switchMap(() => {
    //       return sessionId$;
    //     }),
    //     tap(() => {
    //       console.log("create session ID...");
    //     }),
    //     retry(10),
    //     switchMap(() => {
    //       return this.store.select(selectorGetSessionId);
    //     }),
    //     tap(() => {
    //       console.log("create session ID...");
    //     }),
    //     retry(10),
    //     switchMap((data) => {
    //       this.sessionID = data;
    //       return accountId$;
    //     }),
    //   )
    //   .subscribe();

    // this.store.dispatch(getGenresForMovies());

    this.store.dispatch(getGenresForMovies());
    this.store.dispatch(getRequestToken());
    this.store
      .select(selectorGetRequestToken)
      .pipe(
        tap(() => {
          console.log("Get Request Token...");
        }),
        retry(10),
      )
      .subscribe((data) => {
        this.requestToken = data;
        console.log("Get Request Token - success");

        if (this.requestToken) {
          this.store.dispatch(
            getValidRequestToken({ requestToken: this.requestToken }),
          );
          this.isValidationToken = true;
        }

        if (this.isValidationToken) {
          this.store.dispatch(
            getUserSessionId({ requestToken: this.requestToken }),
          );
          this.store
            .select(selectorGetSessionId)
            .pipe(
              tap(() => {
                console.log("Get Session Id...");
              }),
              retry(10),
            )
            .subscribe((data) => {
              this.sessionID = data;
              console.log("Get Session Id - success");

              if (this.sessionID) {
                this.store.dispatch(
                  getUserAccountId({ sessionID: this.sessionID }),
                );
              }
            });
        }
      });
  }
}

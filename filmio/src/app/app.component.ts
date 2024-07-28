import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AuthUserService } from "./services/users/authUser.service.service";
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
  private sessionID: any;
  private accountId: any;

  constructor(
    private authUserService: AuthUserService,
    private store: Store,
  ) {}

  ngOnInit() {
    this.store.dispatch(getRequestToken());
    this.store.select(selectorGetRequestToken).subscribe((data) => {
      this.requestToken = data;

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
        this.store.select(selectorGetSessionId).subscribe((data) => {
          this.sessionID = data;

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

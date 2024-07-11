import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { switchMap } from "rxjs";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AuthUserService } from "./services/users/authUser.service.service";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, SidebarComponent, RouterModule, CatalogComponent],
})
export class AppComponent implements OnInit {
  private requestToken: any;
  private sessionID: any;
  private accountId: any;

  constructor(private authUserService: AuthUserService) {}

  ngOnInit() {
    this.authUserService
      .getRequestToken()
      .pipe(
        switchMap((response: any) => {
          this.requestToken = response;
          this.requestToken = this.requestToken.request_token;
          return this.authUserService.getValidToken(this.requestToken);
        }),
        switchMap(() => {
          return this.authUserService.createSessionId(this.requestToken);
        }),
        switchMap((response: any) => {
          this.sessionID = response;
          this.sessionID = this.sessionID.session_id;
          return this.authUserService.getAccountId(this.sessionID);
        }),
      )
      .subscribe((response) => {
        this.accountId = response;
        this.accountId = this.accountId.id;
        this.authUserService.setUserData(
          this.requestToken,
          this.sessionID,
          this.accountId,
        );

        console.log(`
          request_token: ${this.requestToken}
          session_id: ${this.sessionID}
          account_id: ${this.accountId}
          `);
      });
  }
}

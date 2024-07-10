import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { switchMap } from "rxjs";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AuthUserService } from "./services/authUser.service.service";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, SidebarComponent, RouterModule, CatalogComponent],
})
export class AppComponent implements OnInit {
  private token: any;
  private sessionID: any;
  private accountId: any;

  constructor(private authUserService: AuthUserService) {}

  ngOnInit() {
    this.authUserService
      .getToken()
      .pipe(
        switchMap((response: any) => {
          this.token = response;
          this.token = this.token.request_token;
          return this.authUserService.getValidToken(this.token);
        }),
        switchMap(() => {
          return this.authUserService.createSessionId(this.token);
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
          this.token,
          this.sessionID,
          this.accountId,
        );

        console.log(`request_token: ${this.token}`);
        console.log(`session_id: ${this.sessionID}`);
        console.log(`account_id: ${this.accountId}`);
      });
  }
}

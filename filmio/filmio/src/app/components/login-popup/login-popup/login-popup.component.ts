import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { concatMap, filter, tap } from "rxjs";
import {
  loadRequestToken,
  loadUserAccountId,
  loadUserSessionId,
  loadValidRequestToken,
} from "../../../store/user-store/user-actions";
import {
  selectAccountId,
  selectRequestToken,
  selectSessionId,
  selectValidRequestToken,
} from "../../../store/user-store/user-selectors";

@Component({
  selector: "app-login-popup",
  standalone: true,
  imports: [
    FloatLabelModule,
    FormsModule,
    PasswordModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
  ],
  templateUrl: "./login-popup.component.html",
  styleUrls: ["./login-popup.component.css"],
})
export class LoginPopupComponent implements OnInit {
  public value: string | undefined;
  public userAuthorization!: FormGroup;
  public visible: boolean = true;
  private requestToken: string | null | undefined;
  private sessionID: string | null | undefined;
  private accountID: string | null | undefined;

  constructor(private store: Store) {}

  ngOnInit() {
    this.userAuthorization = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      password: new FormControl("", [Validators.required]),
    });
  }

  handleSubmit = () => {
    localStorage.setItem("name", this.userAuthorization.value.name);
    localStorage.setItem("password", this.userAuthorization.value.password);

    this.store.dispatch(loadRequestToken());

    this.store
      .select(selectRequestToken)
      .pipe(
        filter((requestToken) => {
          return requestToken !== null && requestToken !== undefined;
        }),
        concatMap((requestToken) => {
          this.requestToken = requestToken;
          this.store.dispatch(
            loadValidRequestToken({
              requestToken: this.requestToken,
            }),
          );
          //припустимо, що після валідації, requestToken може змінитись на інший
          return this.store.select(selectValidRequestToken);
        }),
        filter((validatedToken) => {
          return validatedToken !== null && validatedToken !== undefined;
        }),
        concatMap((validatedToken) => {
          this.requestToken = validatedToken;
          this.store.dispatch(
            loadUserSessionId({ requestToken: this.requestToken }),
          );
          return this.store.select(selectSessionId);
        }),
        filter((sessionID) => {
          return sessionID !== null && sessionID !== undefined;
        }),
        concatMap((sessionID) => {
          this.sessionID = sessionID;
          this.store.dispatch(loadUserAccountId({ sessionID: this.sessionID }));
          return this.store.select(selectAccountId);
        }),
        filter((accountID) => accountID !== null && accountID !== undefined),
        tap((accountID) => {
          this.accountID = accountID;
        }),
      )
      .subscribe(() => {
        if (this.requestToken && this.sessionID && this.accountID) {
          console.log(
            `%c Authorization successful`,
            `color: green; font-weight: 700`,
          );
        }
      });
  };

  showDialog() {
    this.visible = true;
  }
}

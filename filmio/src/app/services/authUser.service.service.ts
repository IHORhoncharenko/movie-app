import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.models";

@Injectable({
  providedIn: "root",
})
export class AuthUserService {
  private apiKey = "?api_key=3a52fcc8f8a0f860ecd716dd7a6e6334";
  private apiUrlValidToken =
    "https://api.themoviedb.org/3/authentication/token/validate_with_login";
  private apiUrlSession =
    "https://api.themoviedb.org/3/authentication/session/new";
  private apiUrlAccount = "https://api.themoviedb.org/3/account";
  private userAuthProp: User | undefined;

  constructor(private http: HttpClient) {}

  getToken = () => {
    return this.http.get(
      `https://api.themoviedb.org/3/authentication/token/new${this.apiKey}`,
    );
  };

  getValidToken = (token: string) => {
    return this.http.post(
      `${this.apiUrlValidToken}${this.apiKey}`,
      {
        username: "IHORhoncharenko",
        password: "ejU9v9UxvRjpwe.",
        request_token: token,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );
  };

  createSessionId = (token: string) => {
    return this.http.post(
      `${this.apiUrlSession}${this.apiKey}`,
      {
        request_token: token,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );
  };

  getAccountId = (sessionId: string) => {
    return this.http.get(
      `${this.apiUrlAccount}${this.apiKey}&session_id=${sessionId}`,
    );
  };

  setUserData = (token: string, sessionID: string, accountId: string) => {
    return (this.userAuthProp = {
      token: token,
      accountId: accountId,
      sessionID: sessionID,
    });
  };

  getUserData = () => {
    if (this.userAuthProp) {
      return this.userAuthProp;
    } else {
      return console.log(`userAuthProp not found`);
    }
  };
}

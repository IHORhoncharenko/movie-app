import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Account } from "../../models/account.models";
import { RequestToken } from "../../models/request-token.models";
import { Session } from "../../models/session.models";

@Injectable({
  providedIn: "root",
})
export class AuthUserService {
  private apiKeyTMDB = environment.apiKeyTMDB;
  private apiUrlValidTokenTMDB = environment.apiUrlValidTokenTMDB;
  private apiUrlSessionTMDB = environment.apiUrlSessionTMDB;
  private apiUrlAccountTMDB = environment.apiUrlAccountTMDB;
  private apiUrlRequestToken = environment.apiUrlRequestToken;
  private usernameTMDB = environment.usernameTMDB;
  private passwordTMDB = environment.passwordTMDB;
  private baseApiUrlTMDB = environment.baseApiUrlTMDB;

  constructor(private http: HttpClient) {}

  //https://developer.themoviedb.org/reference/authentication-create-request-token
  getRequestToken = () => {
    return this.http.get<RequestToken>(
      `${this.baseApiUrlTMDB}/${this.apiUrlRequestToken}?api_key=${this.apiKeyTMDB}`,
    );
  };

  //https://developer.themoviedb.org/reference/authentication-create-session-from-login
  getValidToken = (token: string) => {
    return this.http.post<RequestToken>(
      `${this.baseApiUrlTMDB}/${this.apiUrlValidTokenTMDB}?api_key=${this.apiKeyTMDB}`,
      JSON.stringify({
        username: this.usernameTMDB,
        password: this.passwordTMDB,
        request_token: token,
      }),
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      },
    );
  };

  //https://developer.themoviedb.org/reference/authentication-create-session
  createSessionId = (token: string) => {
    return this.http.post<Session>(
      `${this.baseApiUrlTMDB}/${this.apiUrlSessionTMDB}?api_key=${this.apiKeyTMDB}`,
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
    return this.http.get<Account>(
      `${this.baseApiUrlTMDB}/${this.apiUrlAccountTMDB}?api_key=${this.apiKeyTMDB}&session_id=${sessionId}`,
    );
  };
}

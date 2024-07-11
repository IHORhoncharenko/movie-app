import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { User } from "../../models/user.models";

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
  private userAuthPropTMDB: User | undefined;
  private baseApiUrlTMDB = environment.baseApiUrlTMDB;

  constructor(private http: HttpClient) {}

  getRequestToken = () => {
    return this.http.get(
      `${this.baseApiUrlTMDB}/${this.apiUrlRequestToken}?api_key=${this.apiKeyTMDB}`,
    );
  };

  getValidToken = (token: string) => {
    return this.http.post(
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

  createSessionId = (token: string) => {
    return this.http.post(
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
    return this.http.get(
      `${this.baseApiUrlTMDB}/${this.apiUrlAccountTMDB}?api_key=${this.apiKeyTMDB}&session_id=${sessionId}`,
    );
  };

  setUserData = (token: string, sessionID: string, accountId: string) => {
    return (this.userAuthPropTMDB = {
      token: token,
      accountId: accountId,
      sessionID: sessionID,
    });
  };

  getUserData = () => {
    if (this.userAuthPropTMDB) {
      return this.userAuthPropTMDB;
    } else {
      return console.log(`userAuthProp not found`);
    }
  };
}

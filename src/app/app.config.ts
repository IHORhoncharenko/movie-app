import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { routes } from "./app.routes";
import { MovieEffects } from "./store/movie-store/effects";
import { MovieReducer } from "./store/movie-store/reducer";
import { UserEffects } from "./store/user-store/user-effects";
import { UserReducer } from "./store/user-store/user-reducer";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({
      movieState: MovieReducer,
      userState: UserReducer,
    }),
    provideEffects([MovieEffects, UserEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};

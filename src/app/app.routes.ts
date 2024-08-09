import { Routes } from "@angular/router";
import { MovieCardPageComponent } from "./pages/movie-card-page/movie-card-page.component";
import { MovieFavoriteListPageComponent } from "./pages/movie-favorite-list-page/movie-favorite-list-page.component";
import { MovieListPageComponent } from "./pages/movie-list-page/movie-list-page.component";
import { MovieWatchListPageComponent } from "./pages/movie-watch-list-page/movie-watch-list-page.component";
import { NotFoundPageComponent } from "./pages/not-found-page/not-found-page.component";
import { NowPlaingPageComponent } from "./pages/now-plaing-page/now-plaing-page.component";
import { PopularPageComponent } from "./pages/popular-page/popular-page.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { TopRatePageComponent } from "./pages/top-rate-page/top-rate-page.component";
import { UpcomingPageComponent } from "./pages/upcoming-page/upcoming-page.component";

export const routes: Routes = [
  { path: "", pathMatch: "full", component: MovieListPageComponent },
  { path: "movie/:id", pathMatch: "full", component: MovieCardPageComponent },
  { path: "now-plaing", pathMatch: "full", component: NowPlaingPageComponent },
  { path: "popular", pathMatch: "full", component: PopularPageComponent },
  { path: "top-rate", pathMatch: "full", component: TopRatePageComponent },
  { path: "upcoming", pathMatch: "full", component: UpcomingPageComponent },
  { path: "favorite", component: MovieFavoriteListPageComponent },
  { path: "watch-list", component: MovieWatchListPageComponent },
  {
    path: "search",
    component: SearchPageComponent,
  },
  { path: "**", component: NotFoundPageComponent },
];

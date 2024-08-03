import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { filter, switchMap, tap } from "rxjs";
import { Movie } from "../../models/movie.models";
import { addSearchMovies } from "../../store/movie-store/actions";
import {
  selectLoadAllMovies,
  selectSearchMovie,
} from "../../store/movie-store/selectors";
import { LoginPopupComponent } from "../login-popup/login-popup/login-popup.component";
import { MovieCardComponent } from "../movie-card/movie-card.component";

@Component({
  selector: "app-catalog",
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MenubarModule,
    LoginPopupComponent,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    MovieCardComponent,
  ],
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.css"],
})
export class CatalogComponent implements OnInit {
  public items: MenuItem[] | undefined;
  public searchRow!: FormGroup;
  public isSearch: boolean | undefined | null;
  public searchMovieName: string | undefined | null;
  public allMovies: Movie[] | undefined | null;
  public filteredMovies: Movie[] | undefined | null;

  constructor(private store: Store) {}

  ngOnInit() {
    this.searchRow = new FormGroup({
      search: new FormControl("", []),
    });

    this.items = [
      {
        icon: "pi pi-home",
        route: "/",
      },
      {
        label: "Favorite list",
        icon: "pi pi-heart",
        route: "favorite",
      },
      {
        label: "Watch list",
        icon: "pi pi-eye",
        route: "watch-list",
      },
    ];
  }

  onSubmit() {
    this.store.dispatch(
      addSearchMovies({
        searchMovie: this.searchRow.value.search,
      }),
    );

    this.store
      .select(selectSearchMovie)
      .pipe(
        filter((movieName) => movieName !== null && movieName !== undefined),
        tap((movieName) => {
          this.searchMovieName = movieName;
        }),
        switchMap(() =>
          this.store.select(selectLoadAllMovies).pipe(
            filter(
              (allMovies) => allMovies !== null && allMovies !== undefined,
            ),
            tap((allMovies) => {
              this.allMovies = allMovies;
            }),
          ),
        ),
      )
      .subscribe(() => {
        if (this.allMovies && typeof this.searchMovieName === "string") {
          this.filteredMovies = this.allMovies.filter((movie) =>
            movie.title
              .toLowerCase()
              .includes(this.searchMovieName?.toLowerCase() as string),
          );

          console.log(this.filteredMovies);
          this.isSearch = true;
        } else {
          this.isSearch = false;
        }
      });
  }
}

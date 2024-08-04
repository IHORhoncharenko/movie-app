import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { MenuItem } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { MenubarModule } from "primeng/menubar";
import { addSearchMovies } from "../../store/movie-store/actions";
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

  constructor(
    private store: Store,
    private router: Router,
  ) {}

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

    this.router.navigate(["/search"], {
      queryParams: {
        q: this.searchRow.value.search,
      },
    });
  }
}

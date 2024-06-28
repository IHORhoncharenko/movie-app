import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from "@angular/router";
import { MenuItem } from "primeng/api";
import { MenubarModule } from "primeng/menubar";
import { MovieCardMainComponent } from "./components/movie-card-main/movie-card-main.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { MovieCardPageComponent } from "./pages/movie-card-page/movie-card-page.component";
import { MovieListPageComponent } from "./pages/movie-list-page/movie-list-page.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [
    RouterOutlet,
    MovieListPageComponent,
    SidebarComponent,
    MovieCardPageComponent,
    MovieCardMainComponent,
    RouterModule,
    MenubarModule,
    NgIf,
  ],
})
export class AppComponent implements OnInit {
  public items: MenuItem[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
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
    });
  }
}

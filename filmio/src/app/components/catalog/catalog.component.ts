import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MenuItem } from "primeng/api";
import { MenubarModule } from "primeng/menubar";

@Component({
  selector: "app-catalog",
  standalone: true,
  imports: [RouterLink, NgIf, MenubarModule],
  templateUrl: "./catalog.component.html",
  styleUrls: ["./catalog.component.css"],
})
export class CatalogComponent implements OnInit {
  public items: MenuItem[] | undefined;

  constructor() {}

  ngOnInit() {
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
}

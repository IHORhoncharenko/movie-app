import { Component, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { CatalogComponent } from "./components/catalog/catalog.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports: [RouterOutlet, SidebarComponent, RouterModule, CatalogComponent],
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}

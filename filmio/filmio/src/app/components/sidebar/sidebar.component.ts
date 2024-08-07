import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AvatarModule } from "primeng/avatar";
import { AvatarGroupModule } from "primeng/avatargroup";
import { ButtonModule } from "primeng/button";
import { ImageModule } from "primeng/image";
import { RippleModule } from "primeng/ripple";
import { SidebarModule } from "primeng/sidebar";
import { StyleClassModule } from "primeng/styleclass";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AvatarGroupModule,
    RippleModule,
    StyleClassModule,
    ImageModule,
  ],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  public isSidebarVisible = false;
}

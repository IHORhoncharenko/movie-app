import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { MovieCardPageComponent } from './pages/movie-card-page/movie-card-page.component';
import { MovieCardMainComponent } from './components/movie-card-main/movie-card-main.component';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    MovieListPageComponent,
    SidebarComponent,
    MovieCardPageComponent,
    MovieCardMainComponent,
    RouterModule,
    MenubarModule,
    NgIf
  ]
})
export class AppComponent implements OnInit {

  public isFavoriteListActive = false;
  public isWatchListActive = false;
  public items: MenuItem[] | undefined;

  toggleFavoriteList() {
    this.isFavoriteListActive = !this.isFavoriteListActive;
    if (this.isFavoriteListActive) {
      this.isWatchListActive = false;
    }
  }

  toggleWatchList() {
    this.isWatchListActive = !this.isWatchListActive;
    if (this.isWatchListActive) {
      this.isFavoriteListActive = false;
    }
  }

  public showBlock: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.showBlock = url.includes('movie/');

      console.log(this.router);

      this.items = [
        {
          icon: 'pi pi-home',
          route: '/'
        },
        {
          label: 'Favorite list',
          icon: 'pi pi-heart',
          route: 'favorite',

        },
        {
          label: 'Watch list',
          icon: 'pi pi-eye',
          route: 'watch-list'
        }
      ];

    });
  }
}


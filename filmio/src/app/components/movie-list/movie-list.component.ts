import { Component} from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {

  public filmIdsFav = JSON.parse(`[]`);
  public filmIdsWatch = JSON.parse(`[]`);

  movie = {
    "img": {
      "src": "../../assets/planet-apes.jpg",
      "srcset": [
        "../../assets/planet-apes_txifwj_c_scale,w_480.webp 480w",
        "../../assets/planet-apes_txifwj_c_scale,w_561.webp 561w",
        "../../assets/planet-apes_txifwj_c_scale,w_634.webp 634w",
        "../../assets/planet-apes_txifwj_c_scale,w_700.webp 700w",
        "../../assets/planet-apes_txifwj_c_scale,w_722.webp 722w",
        "../../assets/planet-apes_txifwj_c_scale,w_775.webp 775w",
        "../../assets/planet-apes_txifwj_c_scale,w_825.webp 825w",
        "../../assets/planet-apes_txifwj_c_scale,w_849.webp 849w",
        "../../assets/planet-apes_txifwj_c_scale,w_879.webp 879w",
        "../../assets/planet-apes_txifwj_c_scale,w_886.webp 886w",
        "../../assets/planet-apes_txifwj_c_scale,w_1235.webp 1235w",
        "../../assets/planet-apes_txifwj_c_scale,w_1239.webp 1239w",
        "../../assets/planet-apes_txifwj_c_scale,w_1278.webp 1278w",
        "../../assets/planet-apes_txifwj_c_scale,w_1309.webp 1309w",
        "../../assets/planet-apes_txifwj_c_scale,w_1340.webp 1340w",
        "../../assets/planet-apes_txifwj_c_scale,w_1370.webp 1370w",
        "../../assets/planet-apes_txifwj_c_scale,w_1399.webp 1399w",
        "../../assets/planet-apes_txifwj_c_scale,w_1428.webp 1428w",
        "../../assets/planet-apes_txifwj_c_scale,w_1460.webp 1460w",
        "../../assets/planet-apes_txifwj_c_scale,w_1488.webp 1488w",
        "../../assets/planet-apes_txifwj_c_scale,w_1520.webp 1520w",
        "../../assets/planet-apes_txifwj_c_scale,w_1547.webp 1547w",
        "../../assets/planet-apes_txifwj_c_scale,w_1577.webp 1577w",
        "../../assets/planet-apes_txifwj_c_scale,w_1607.webp 1607w",
        "../../assets/planet-apes_txifwj_c_scale,w_1650.webp 1650w",
        "../../assets/planet-apes_txifwj_c_scale,w_1680.webp 1680w",
        "../../assets/planet-apes_txifwj_c_scale,w_1683.webp 1683w",
        "../../assets/planet-apes_txifwj_c_scale,w_1803.webp 1803w",
        "../../assets/planet-apes_txifwj_c_scale,w_1826.webp 1826w",
        "../../assets/planet-apes_txifwj_c_scale,w_1868.webp 1868w",
        "../../assets/planet-apes_txifwj_c_scale,w_1920.webp 1920w",
      ],
      "alt": "A post-apocalyptic world where nature has taken over the once great human megacities."
    },
    "id": 653346,
    "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
    "release_date": "May 5, 2024",
    "title": "Kingdom of the Planet of the Apes",
    "rating": 8.5,
    "duration": 138
  };

  addToFavorites = (movieId: number) => {
    this.filmIdsFav.push(movieId);
  }

  addToWatchList = (movieId: number) => {
    this.filmIdsWatch.push(movieId);
  }

}

import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RatingModule } from "primeng/rating";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-review",
  standalone: true,
  imports: [CommonModule, FormsModule, RatingModule],
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"],
})
export class ReviewComponent implements OnInit {
  @Input()
  movieData: any = {};

  public value: number | undefined;
  public userName: boolean | undefined;
  public urlPoster: string | undefined;
  private apiKeyTMDB = environment.apiKeyTMDB;

  constructor() {}

  ngOnInit() {
    this.userName = this.movieData.author_details.name;
    this.value = this.movieData.author_details.rating;

    this.urlPoster = `https://image.tmdb.org/t/p/w500${this.movieData.author_details.avatar_path}?api_key=${this.apiKeyTMDB}`;
    console.log(this.urlPoster);
  }
}

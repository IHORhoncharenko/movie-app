import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RatingModule } from "primeng/rating";
import { ClearObservable } from "../../abstract/clear-observers";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-review",
  standalone: true,
  imports: [CommonModule, FormsModule, RatingModule],
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.css"],
})
export class ReviewComponent extends ClearObservable implements OnInit {
  @Input()
  movieData: any = {};

  public value: number | undefined;
  public userName: boolean | undefined;
  public correctUrlPoster: string | undefined | null;
  private urlPoster = environment.apiUrlPosterTMDB;
  private apiKeyTMDB = environment.apiKeyTMDB;

  constructor() {
    super();
  }

  ngOnInit() {
    this.userName = this.movieData.author_details.name;
    this.value = this.movieData.author_details.rating;

    this.correctUrlPoster = `${this.urlPoster}${this.movieData.author_details.avatar_path}?api_key=${this.apiKeyTMDB}`;
  }
}

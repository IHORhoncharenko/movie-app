import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Store } from "@ngrx/store";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { RatingModule } from "primeng/rating";
import { ClearObservable } from "../../abstract/clear-observers";
import { addSortingMovie } from "../../store/movie-store/actions";

@Component({
  selector: "app-sort",
  standalone: true,
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.css"],
  imports: [
    ReactiveFormsModule,
    MultiSelectModule,
    RatingModule,
    DropdownModule,
  ],
})
export class SortComponent extends ClearObservable implements OnInit {
  public sorting: any[] | undefined;
  public sortMovie!: FormGroup;

  constructor(private store: Store) {
    super();
  }

  ngOnInit() {
    this.sorting = [
      { selectedSort: "rating" },
      { selectedSort: "genres" },
      { selectedSort: "default" },
    ];

    this.sortMovie = new FormGroup({
      selectedSortMethod: new FormControl("", []),
    });
  }

  onSubmit = () => {
    this.store.dispatch(
      addSortingMovie({
        sortingMovie: this.sortMovie.value.selectedSortMethod,
      }),
    );
  };
}

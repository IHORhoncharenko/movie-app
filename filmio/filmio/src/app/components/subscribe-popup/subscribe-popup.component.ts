import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { FloatLabelModule } from "primeng/floatlabel";
import { InputTextModule } from "primeng/inputtext";
import { MultiSelectModule } from "primeng/multiselect";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { map } from "rxjs";
import { selectGenresMovie } from "../../store/movie-store/selectors";
import {
  deleteSubscribeDataUser,
  loadSubscribeDataUser,
} from "../../store/user-store/user-actions";
import { selectUserDataSubscribe } from "../../store/user-store/user-selectors";

@Component({
  selector: "app-subscribe-popup",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    FloatLabelModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    CheckboxModule,
    ToastModule,
    RippleModule,
  ],
  templateUrl: "./subscribe-popup.component.html",
  styleUrls: ["./subscribe-popup.component.css"],
  providers: [MessageService],
})
export class SubscribePopupComponent implements OnInit {
  public userSubscribe!: FormGroup;
  public userUnsubscribe!: FormGroup;
  public value: string | undefined;
  public visible: boolean = false;
  public visibleUnsubscribeDialog: boolean = false;
  public years: any[] | undefined = [];
  public genres: any[] | undefined = [];
  public isShowUnsubscribe: boolean | null | undefined;

  constructor(
    private store: Store,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.userSubscribe = new FormGroup({
      name: new FormControl("", [Validators.minLength(3), Validators.required]),
      email: new FormControl("", [Validators.email, Validators.required]),
      years: new FormControl("", [Validators.required]),
      genres: new FormControl(""),
      agree: new FormControl("", [Validators.required]),
    });

    this.userUnsubscribe = new FormGroup({
      agree: new FormControl("", [Validators.required]),
    });

    for (let i = 1980; i <= 2014; i++) {
      this.years?.push({ year: i });
    }

    this.store
      .select(selectGenresMovie)
      .pipe(
        map((movie) => {
          this.genres = movie;
        }),
      )
      .subscribe();

    this.store
      .select(selectUserDataSubscribe)
      .pipe(
        map((data) => {
          if (data?.agree) {
            this.isShowUnsubscribe = true;
          } else {
            this.isShowUnsubscribe = false;
          }
        }),
      )
      .subscribe();
  }

  showDialogSubscribe() {
    this.visible = true;
  }
  showDialogUnsubscribe() {
    this.visibleUnsubscribeDialog = true;
  }
  handleSubmitUserSubscribe = () => {
    this.store.dispatch(
      loadSubscribeDataUser({
        subscribe: {
          name: this.userSubscribe.value.name,
          email: this.userSubscribe.value.email,
          years: this.userSubscribe.value.years,
          genres: this.userSubscribe.value.genres,
          agree: this.userSubscribe.value.agree,
        },
      }),
    );
  };

  handleSubmitUserUnsubscribe = () => {
    this.store.dispatch(deleteSubscribeDataUser());
  };

  showSuccess() {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Thank you for subscribing",
    });
  }

  showSuccessUnsubscribe() {
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Subscription successfully canceled",
    });
  }
}

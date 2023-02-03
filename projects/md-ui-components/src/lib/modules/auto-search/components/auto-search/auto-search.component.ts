import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";

@Component({
  selector: "mdc-auto-search",
  templateUrl: "./auto-search.component.html",
})
export class AutoSearchComponent implements OnInit, OnDestroy {
  @ViewChild("searchInput", { static: true }) searchInput!: ElementRef;
  @Output() complete = new EventEmitter<string>();
  @Output() onTimeout = new EventEmitter<string>();
  @Input() minLength = 1;
  @Input() placeholder = "";
  @Input() pause = 500;
  @Input() separateTimeoutEvent = false;
  prevText = "";
  @Input() text = "";
  private _destroy$ = new Subject<void>();

  get isText(): boolean {
    return (this.text || '').trim() !== ''
  }

  get textTrim(): string {
    return (this.text || "").trim();
  }
  active = false;

  ngOnDestroy(): void {
    this._destroy$.next();
  }

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, "keydown")
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (ev: any) => {
          if (ev.key === "Enter") {
            this.complete.emit(this.textTrim);
          }
        }
      )


    fromEvent(this.searchInput.nativeElement, "keyup")
      .pipe(debounceTime(this.pause))
      .pipe(takeUntil(this._destroy$))
      .subscribe(ev => {
        if (this.prevText === this.text) {
          return;
        }
        if (this.text.length < this.minLength && this.text != "") {
          return;
        }
        this.prevText = this.text;
        if (this.separateTimeoutEvent) {
          this.onTimeout.emit(this.textTrim);
        } else {
          this.complete.emit(this.textTrim);
        }
      })

  }

  search(): void {
    this.complete.emit(this.textTrim);
  }

  clearText(): void {
    if (this.text.length) {
      this.prevText = this.text;
      this.text = "";
      this.search();
    }
  }

  focus(): void {
    this.searchInput?.nativeElement?.focus();
  }
}

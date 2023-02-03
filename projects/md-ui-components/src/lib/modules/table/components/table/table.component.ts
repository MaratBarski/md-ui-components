import { Component, ChangeDetectionStrategy, } from "@angular/core";

@Component({
  selector: "mdc-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TableComponent {
  constructor() { }
}

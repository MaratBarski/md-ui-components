import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from '../paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon';
import { TableComponent } from './components/table/table.component';
import { CheckBoxModule } from '../check-box';



@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    CheckBoxModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule { }

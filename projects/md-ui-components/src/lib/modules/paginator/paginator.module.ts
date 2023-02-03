import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { IconModule } from '../icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationPipe } from './pipes/pagination.pipe';



@NgModule({
  declarations: [
    PaginatorComponent,
    PaginationPipe
  ],
  imports: [
    CommonModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PaginatorComponent,
    PaginationPipe
  ]
})
export class PaginatorModule { }

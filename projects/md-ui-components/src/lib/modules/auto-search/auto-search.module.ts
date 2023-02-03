import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoSearchComponent } from './components/auto-search/auto-search.component';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    AutoSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule
  ],
  exports: [AutoSearchComponent]
})
export class AutoSearchModule { }

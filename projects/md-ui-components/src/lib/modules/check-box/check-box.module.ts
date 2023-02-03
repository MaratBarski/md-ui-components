import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxComponent } from './components/check-box/check-box.component';
import { IconModule } from '../icon/icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CheckBoxComponent
  ],
  imports: [
    CommonModule,
    IconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    CheckBoxComponent
  ]
})
export class CheckBoxModule { }

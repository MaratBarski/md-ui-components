import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './components/accordion/accordion.component';
import { IconModule } from '../icon';

@NgModule({
  declarations: [
    AccordionComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports:[
    AccordionComponent
  ]
})
export class AccordionModule { }

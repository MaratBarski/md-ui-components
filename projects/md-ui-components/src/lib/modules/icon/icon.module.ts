import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconDirective } from './directives/icon.directive';
import { SvgLoaderComponent } from './components/svg-loader/svg-loader.component';

@NgModule({
  declarations: [
    IconDirective,
    SvgLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [IconDirective, SvgLoaderComponent]
})
export class IconModule { }

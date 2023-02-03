import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[mdcSvg]'
})
export class IconDirective {

  @Input('mdcSvg') set path(path: string) {
    this._path = path;
    this.init();
  }
  get path(): string {
    return this._path ? `xlink:href="#${this._path}"` : '';
  }
  private _path = '';

  @Input('color') set color(color: string) {
    this._color = color;
    this.init();
  }
  get color(): string {
    return this._color ? `fill="${this._color}"` : '';
  }
  private _color?: string;

  constructor(
    private elementRef: ElementRef
  ) {
  }

  private init(): void {
    this.elementRef.nativeElement.innerHTML = `<use fill-rule="evenodd" ${this.path} ${this.color} />`;
  }
}

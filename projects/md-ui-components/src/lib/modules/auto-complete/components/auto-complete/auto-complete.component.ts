import { Component, Input, TemplateRef, EventEmitter, Output, ViewContainerRef, ContentChild, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'mdc-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent {

  @Input() maxHeight = '300px';
  @Input() disabled = false;
  @Input() isCollapsed = false;

  @ViewChild('container', { static: true }) container!: ElementRef;
  @Input() inputText: string = '';
  @ContentChild(TemplateRef, { read: TemplateRef, static: true }) template!: TemplateRef<any>;
  @Output() completeMethod = new EventEmitter<string>();
  @Output() onClear = new EventEmitter();
  @Output() onSelectOpen = new EventEmitter<boolean>();

  @Input() set suggestions(suggestions: Array<any>) {
    this.currentIndex = -1;
    this._suggestions = suggestions;
  }
  @Input() placeHolder = 'Search...';
  @Input() set minLength(minLength: number) { this._minLength = Math.max(1, minLength); }
  @Input() textField = '';
  @Output() onSelect = new EventEmitter<any>();
  @Input() dropdown = true;
  @Input() width?: number;
  @Input() isLine = false;
  @Input() isValid = true;
  @Input() isClearEnable = true;

  get suggestions(): Array<any> { return this._suggestions; }
  get minLength(): number { return this._minLength; }
  private _minLength = 3;
  currentIndex = -1;
  isSelected = false;
  private _suggestions!: Array<any>;
  isOver = false;

  set selectOpen(value: boolean) {
    this._selectOpen = value;
    this.onSelectOpen.emit(value);
  }
  get selectOpen(): boolean { return this._selectOpen; }
  private _selectOpen = false;

  @HostListener('document:click', ['$event']) onMouseClick(event: any) {
    if (this.isOver) { return; }
    this.isSelected = true;
    this.selectOpen = false;
  }

  search(event: any): void {
    if (this.disabled) { return; }
    if (event.keyCode === 13) { return; }
    if (event.keyCode === 38) { return; }
    if (event.keyCode === 40) { return; }

    if (this.inputText.length >= this.minLength) {
      this.completeMethod.emit(this.inputText);
    }
  }

  clearText(): void {
    if (this.disabled) { return; }
    this.inputText = '';
    this.selectOpen = false;
    this.currentIndex = -1;
    this.isSelected = false;
    this.onClear.emit();
  }

  openSelect(): void {
    if (this.disabled) { return; }
    this.completeMethod.emit('');
    this.selectOpen = !this.selectOpen;
  }

  selectItem(index: number): void {
    this.currentIndex = -1;
    this.selectOpen = false;
    this.isSelected = true;
    this.inputText = this.suggestions[index][this.textField];
    this.onSelect.emit(this.suggestions[index]);
  }

  get isHiddeSuggestions(): boolean {
    if (this.selectOpen) {
      return false;
    }
    return !this.suggestions ||
      !this.suggestions.length ||
      this.isSelected ||
      !this.inputText.trim();
  }

  private moveUp(): void {
    if (this.currentIndex === 0) { return; }
    if (this.currentIndex === -1) {
      this.currentIndex = this.suggestions.length - 1;
    } else {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.suggestions.length - 1;
      }
    }
    this.moveToView();
  }

  private moveDown(): void {
    if (this.currentIndex === this.suggestions.length - 1) { return; }
    if (this.currentIndex === -1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
      if (this.currentIndex === this.suggestions.length) {
        this.currentIndex = 0;
      }
    }
    this.moveToView();
  }

  private moveToView(): void {
    if (this.currentIndex < 2) {
      this.container.nativeElement.scrollTop = 0;
      return;
    }
    const element = this.container.nativeElement.childNodes[this.currentIndex];
    if (element.scrollIntoView) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' });
    }
  }

  onKeyDown(event: any): void {
    this.isSelected = false;
    if (!this.suggestions || !this.suggestions.length) {
      return;
    }
    if (event.keyCode === 13) {
      event.stopPropagation();
      this.isSelected = true;
      this.selectOpen = false;
      this.inputText = this.suggestions[this.currentIndex][this.textField];
      this.onSelect.emit(this.suggestions[this.currentIndex]);
    }
    if (event.keyCode === 38) {
      event.stopPropagation();
      this.moveUp();
    }
    if (event.keyCode === 40) {
      event.stopPropagation();
      this.moveDown();
    }
  }
}

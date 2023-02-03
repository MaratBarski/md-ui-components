import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'md-ui-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent {

  @Input() className = 'btn_icon';
  @Input() disabled = false;
  @Input() text = 'Button';
  @Output() clicked = new EventEmitter<void>();

  click(): void {
    this.clicked.emit();
  }

}

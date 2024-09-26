import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-registration-prompt',
  templateUrl: './registration-prompt.component.html',
  styleUrls: ['./registration-prompt.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-50px)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateY(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ transform: 'translateY(-50px)', opacity: 0 }))
      ])
    ])
  ]
})
export class RegistrationPromptComponent {


  @Input() show: boolean = false;
  @Input() message: string = 'Please register to access this feature.';
  @Output() register = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onRegister() {
    this.register.emit();
  }

  onClose() {
    this.close.emit();
  }


}

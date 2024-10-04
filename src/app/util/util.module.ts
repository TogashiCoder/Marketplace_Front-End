import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilRoutingModule } from './util-routing.module';
import { UtilComponent } from './util.component';
import { RegistrationPromptComponent } from './registration-prompt/registration-prompt.component';
import { TestUtilComponent } from './test-util/test-util.component';
import { SuccessPopupComponent } from './success-popup/success-popup.component';


@NgModule({
  declarations: [
    UtilComponent,
    RegistrationPromptComponent,
    TestUtilComponent,
    SuccessPopupComponent
  ],
  imports: [
    CommonModule,
    UtilRoutingModule
  ],
  exports: [
    RegistrationPromptComponent,
    SuccessPopupComponent
  ]
})
export class UtilModule { }

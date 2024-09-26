import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilRoutingModule } from './util-routing.module';
import { UtilComponent } from './util.component';
import { RegistrationPromptComponent } from './registration-prompt/registration-prompt.component';
import { TestUtilComponent } from './test-util/test-util.component';


@NgModule({
  declarations: [
    UtilComponent,
    RegistrationPromptComponent,
    TestUtilComponent
  ],
  imports: [
    CommonModule,
    UtilRoutingModule
  ],
  exports: [
    RegistrationPromptComponent,
  ]
})
export class UtilModule { }

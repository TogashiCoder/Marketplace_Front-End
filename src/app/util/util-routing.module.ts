import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilComponent } from './util.component';
import { RegistrationPromptComponent } from './registration-prompt/registration-prompt.component';
import { TestUtilComponent } from './test-util/test-util.component';
const routes: Routes = [
  { path: '', component: UtilComponent },
  // { path:'registrationPrompt',component:RegistrationPromptComponent},
  { path:'test', component:TestUtilComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilRoutingModule { }

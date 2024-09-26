import { Component } from '@angular/core';

@Component({
  selector: 'app-test-util',
  templateUrl: './test-util.component.html',
  styleUrls: ['./test-util.component.css']
})
export class TestUtilComponent {

  showPrompt = false;

  onFollowShop() {
    if (!this.isLoggedIn()) {
      this.showPrompt = true;
    } else {
      // Perform follow shop action
      console.log('Following shop...');
    }
  }

  onRegister() {
    // Navigate to registration page
    console.log('Navigating to registration page...');
    this.showPrompt = false;
  }

  onClosePrompt() {
    this.showPrompt = false;
  }

  isLoggedIn(): boolean {
    // Implement your login check logic here
    return false; // For demonstration
  }


}

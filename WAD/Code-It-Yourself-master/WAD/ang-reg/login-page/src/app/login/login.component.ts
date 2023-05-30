import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  };

  submitForm() {
    console.log('Login form submitted:', this.user);
  // Add logic to authenticate the user or perform other actions
  }
}

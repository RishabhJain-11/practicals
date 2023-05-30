import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  submitForm() {
    console.log('Registration form submitted:', this.user);
    // Add logic to send registration data to backend or perform other actions
  }
}

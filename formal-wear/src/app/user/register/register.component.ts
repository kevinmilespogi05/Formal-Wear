import { Component } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // Declare variables to hold form data
  username: string = '';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = '';
  message: string = '';

  constructor(private rentService: RentService) {}

  // Register function called on form submission
  register() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName,
      phone_number: this.phoneNumber
    };

    // Call RentService to make API request
    this.rentService.registerUser(user).subscribe(
      (response: any) => {
        this.message = response.message; // Show success or error message
      },
      (error: any) => {
        this.message = 'Registration failed. Please try again.';
      }
    );
  }
}

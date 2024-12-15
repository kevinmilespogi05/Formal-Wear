import { Component } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Import Router for navigation
import Swal from 'sweetalert2'; // Import SweetAlert2

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

  constructor(private rentService: RentService, private router: Router) {} // Inject Router

  // Register function called on form submission
  register() {
    // Simple validation before calling the service
    if (!this.username || !this.email || !this.password || !this.firstName || !this.lastName || !this.phoneNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all fields.',
      });
      return;
    }

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

        if (response.success) { // Check for the success condition
          Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'Welcome, ' + this.username + '!',
            confirmButtonText: 'Proceed',
            background: '#f0f0f0',
          }).then(() => {
            // Redirect to login page after successful registration
            this.router.navigate(['/login']); // Use Angular's Router for redirection
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: response.message || 'An error occurred during registration. Please try again.',
          });
        }
      },
      (error: any) => {
        this.message = 'Registration failed. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'An error occurred while registering. Please try again later.',
        });
      }
    );
  }
  navigateToLogin() {
    this.router.navigate(['/login']);  // Navigate to the login route
  }
}

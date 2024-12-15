import { Component } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Import Router
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Declare variables for form fields
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private rentService: RentService, private router: Router) {} // Inject Router

  // Function to handle form submission and login
  login() {
    // Simple validation before calling the service
    if (!this.username || !this.password) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in both fields.',
      });
      return;
    }

    const user = {
      username: this.username,
      password: this.password
    };

    // Call RentService to send login data to the API
    this.rentService.loginUser(user).subscribe(
      (response: any) => {
        this.message = response.message; // Display success or error message
        if (response.message === 'Login successful.') {
          // Check the role in the response
          if (response.role === 'admin') {
            // Redirect to the admin dashboard if the role is admin
            this.router.navigate(['/admin/dashboard']);
            Swal.fire({
              icon: 'success',
              title: 'Login Successful!',
              text: 'Welcome back, ' + this.username,
              confirmButtonText: 'Proceed',
              background: '#f0f0f0',
            });
          } else {
            // Redirect to the rent component for regular users
            this.router.navigate(['/rent']);
            Swal.fire({
              icon: 'success',
              title: 'Login Successful!',
              text: 'Welcome back, ' + this.username,
              confirmButtonText: 'Proceed',
              background: '#f0f0f0',
            });
          }
        } else {
          // Show error alert if login fails
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password. Please try again.',
          });
        }
      },
      (error: any) => {
        // Show error alert in case of server failure
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'An error occurred. Please try again later.',
        });
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);  // Adjust the route path to your actual RegisterComponent route
  }
}

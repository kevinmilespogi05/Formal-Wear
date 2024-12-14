import { Component } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  // Import Router

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
          } else {
            // Redirect to the rent component for regular users
            this.router.navigate(['/rent']);
          }
        }
      },
      (error: any) => {
        this.message = 'Login failed. Please try again.';
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);  // Adjust the route path to your actual RegisterComponent route
  }
}

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
          // Redirect to the rent component on successful login
          this.router.navigate(['/rent']); // Adjust this path to your actual RentComponent route
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

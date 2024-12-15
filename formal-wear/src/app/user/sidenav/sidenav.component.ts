import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for redirection
import { RouterModule } from '@angular/router';  // Import RouterModule explicitly
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],  // Explicitly import RouterModule here
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isSidebarOpen: boolean = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Logout method with SweetAlert2 validation
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'No, stay logged in'
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear user session data (localStorage, sessionStorage, etc.)
        localStorage.removeItem('userToken');  // Example: Remove JWT token from localStorage

        // Optionally clear other session data if necessary
        // localStorage.removeItem('userId'); 

        // Redirect to login page
        this.router.navigate(['/login']);
      }
    });
  }
}

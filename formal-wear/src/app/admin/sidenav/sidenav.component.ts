import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for navigation
import { RouterModule } from '@angular/router';  // Import RouterModule
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],  // Use RouterModule, not Router
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isSidebarOpen: boolean = false;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Logout method with SweetAlert2 confirmation
  logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, stay logged in'
    }).then((result) => {
      if (result.isConfirmed) {
        // Clear session data (localStorage or sessionStorage)
        localStorage.removeItem('userToken');  // Example: Remove JWT token
        // Redirect to login page
        this.router.navigate(['/login']);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userRentals: any[] = [];
  userId: number = 1;  // You will probably get this from a logged-in user context
  isLoading: boolean = true;

  constructor(private rentService: RentService) {}

  ngOnInit() {
    this.getUserRentals();
  }
  
  getUserRentals() {
    this.rentService.getUserRentals(this.userId).subscribe(
      (rentals) => {
        // Sort the rentals by rental date (most recent first)
        this.userRentals = rentals.sort((a, b) => {
          const dateA = new Date(a.rental_date).getTime();
          const dateB = new Date(b.rental_date).getTime();
          return dateB - dateA; // Sort in descending order (most recent first)
        });
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching rentals', error);
        this.isLoading = false;
      }
    );
  }

  cancelRental(rentalId: number) {
    this.rentService.cancelRental(rentalId).subscribe(
      (response) => {
        // Use SweetAlert2 for success
        Swal.fire({
          icon: 'success',
          title: 'Rental Cancelled',
          text: response.message || 'Your rental has been successfully cancelled.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.getUserRentals(); // Refresh the rentals list
        });
      },
      (error) => {
        // Use SweetAlert2 for error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an issue cancelling the rental. Please try again.',
          confirmButtonText: 'Try Again'
        });
      }
    );
  }
}
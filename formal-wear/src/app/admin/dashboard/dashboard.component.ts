import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';  // Import SweetAlert2 for alerts

// Define Rental interface
interface Rental {
  id: number;
  user_id: number;
  product_id: number;
  status: string;
  rental_date: string;
  return_date: string;
  username: string;  // Add username to the Rental interface
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rentals: Rental[] = []; // Explicitly define rentals as an array of Rental objects

  constructor(private rentService: RentService) {}

  ngOnInit() {
    this.loadRentals();
  }

  loadRentals() {
    this.rentService.getAllRentals().subscribe((response: any) => {
      if (response && response.rentals) {
        // Filter pending rentals if necessary
        this.rentals = response.rentals.filter((rental: Rental) => rental.status === 'pending');
        console.log('Pending rentals:', this.rentals); // Add this log to check the fetched data
      } else {
        this.rentals = [];
      }
    });
  }

  confirmRental(rentalId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to confirm this rental?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rentService.confirmRental(rentalId).subscribe((response: any) => {
          Swal.fire('Confirmed!', response.message, 'success');
          this.loadRentals(); // Reload the rentals after confirmation
        });
      }
    });
  }

  declineRental(rentalId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to decline this rental?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, decline!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rentService.declineRental(rentalId).subscribe((response: any) => {
          Swal.fire('Declined!', response.message, 'error');
          this.loadRentals(); // Reload the rentals after declining
        });
      }
    });
  }

  cancelRental(rentalId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this rental?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.rentService.cancelRental(rentalId).subscribe((response: any) => {
          Swal.fire('Cancelled!', response.message, 'info');
          this.loadRentals(); // Reload the rentals after cancellation
        });
      }
    });
  }
}

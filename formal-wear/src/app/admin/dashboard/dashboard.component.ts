import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  rentals: any[] = [];

  constructor(private rentService: RentService) {}

  ngOnInit() {
    this.loadRentals();
  }

  loadRentals() {
    this.rentService.getAllRentals().subscribe((response: any) => {
      if (response && response.rentals) {
        this.rentals = response.rentals;
      } else {
        this.rentals = [];
      }
    });
  }

  confirmRental(rentalId: number) {
    this.rentService.confirmRental(rentalId).subscribe((response: any) => {
      alert(response.message);
      this.loadRentals(); // Reload the rentals after confirmation
    });
  }

  declineRental(rentalId: number) {
    this.rentService.declineRental(rentalId).subscribe((response: any) => {
      alert(response.message);
      this.loadRentals(); // Reload the rentals after declining
    });
  }

  cancelRental(rentalId: number) {
    this.rentService.cancelRental(rentalId).subscribe((response: any) => {
      alert(response.message);
      this.loadRentals(); // Reload the rentals after cancellation
    });
  }
}

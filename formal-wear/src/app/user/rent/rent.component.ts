import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // To handle redirection


@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  products: any[] = [];

  constructor(private rentService: RentService, private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.rentService.getProducts().subscribe((response: any) => {
      if (response && Array.isArray(response) && response.length > 0) {
        this.products = response;
      } else {
        this.products = [];
      }
    });
  }

  rentProduct(productId: number) {
    const rentalData = {
      user_id: 1, // Replace with actual logged-in user ID
      product_id: productId,
      status: 'pending',
      rental_date: new Date().toISOString(),
      return_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString() // Example: 7 days rental
    };

    this.rentService.createRental(rentalData).subscribe((response) => {
      if (response.message === 'Rental created successfully.') {
        alert('Rental request submitted successfully!');
        this.loadProducts();  // Reload the products list
      } else {
        alert('Failed to submit rental request.');
      }
    });
  }

}

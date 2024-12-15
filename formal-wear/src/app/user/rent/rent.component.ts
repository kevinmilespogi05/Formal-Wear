import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // To handle redirection
import Swal from 'sweetalert2'; // Import SweetAlert2 for showing alerts

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;

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
    const selectedProduct = this.products.find(product => product.id === productId);
    if (selectedProduct) {
      this.selectedProduct = selectedProduct;

      const rentalData = {
        user_id: 1, // Replace with actual logged-in user ID
        product_id: productId,
        status: 'pending',
        rental_date: new Date().toISOString(),
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString() // Example: 7 days rental
      };

      this.rentService.createRental(rentalData).subscribe((response) => {
        if (response.message === 'Rental created successfully.') {
          // Use SweetAlert2 for success
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Rental request submitted successfully!',
            confirmButtonText: 'OK'
          });
        } else {
          // Use SweetAlert2 for error
          Swal.fire({
            icon: 'error',
            title: 'Failed to Submit',
            text: 'Failed to submit rental request. Please try again.',
            confirmButtonText: 'Try Again'
          });
        }
      });
    }
  }

  processPayment() {
    // Simulate payment processing
    Swal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      text: 'Your payment has been processed successfully.',
      confirmButtonText: 'OK'
    }).then(() => {
      // Proceed with rental confirmation after payment
      this.confirmRental();
    });
  }

  confirmRental() {
    // Simulate confirming the rental after payment
    if (this.selectedProduct) {
      const rentalData = {
        user_id: 1, // Replace with actual logged-in user ID
        product_id: this.selectedProduct.id,
        status: 'confirmed',
        rental_date: new Date().toISOString(),
        return_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString() // Example: 7 days rental
      };

      this.rentService.createRental(rentalData).subscribe((response) => {
        if (response.message === 'Rental created successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Rental Confirmed!',
            text: 'Your rental has been confirmed.',
            confirmButtonText: 'OK'
          });
          this.selectedProduct = null; // Reset the selected product
          this.loadProducts(); // Reload the product list
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to confirm rental.',
            confirmButtonText: 'Try Again'
          });
        }
      });
    }
  }
}

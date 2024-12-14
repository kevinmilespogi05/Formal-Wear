import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent implements OnInit {
  products: any[] = [];

  constructor(private rentService: RentService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.rentService.getProducts().subscribe((response: any) => {
      console.log(response);  // Log the response for debugging
      if (response && Array.isArray(response) && response.length > 0) {
        this.products = response;  // Assign products array from response
      } else {
        this.products = [];  // If no products are returned, assign an empty array
      }
    }, error => {
      console.error('Error fetching products:', error);
      this.products = [];  // Ensure products is always defined
    });
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.rentService.deleteProduct(productId).subscribe(response => {
        alert(response.message);
        this.loadProducts();  // Reload the product list after deletion
      });
    }
  }
}

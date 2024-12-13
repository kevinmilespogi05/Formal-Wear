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
  // Initialize products as an empty array
  products: any[] = [];

  constructor(private rentService: RentService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.rentService.getProducts().subscribe((response: any) => {
      // Ensure response is an object with a 'products' array
      if (response && response.products) {
        this.products = response.products;  // Assign products array from response
      } else {
        this.products = [];  // In case 'products' is undefined or null in the response
      }
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

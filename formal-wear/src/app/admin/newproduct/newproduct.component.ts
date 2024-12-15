import { Component } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-newproduct',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {
  product: {
    name: string;
    price: number;
    description: string;
    image: File | null;
    availability: number; // Add availability field
  } = {
    name: '',
    price: 0,
    description: '',
    image: null,
    availability: 1 // Set availability to 1 by default (available)
  };

  constructor(private rentService: RentService) {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;
    }
  }

  addProduct() {
    // Validate the form
    if (!this.product.name || !this.product.price || !this.product.description || !this.product.image) {
      Swal.fire({
        title: 'Missing Fields',
        text: 'Please fill in all fields before submitting.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    const formData = new FormData();
    formData.append('product_name', this.product.name);
    formData.append('product_price', this.product.price.toString());
    formData.append('product_description', this.product.description);
    formData.append('availability', this.product.availability.toString()); // Add availability to formData

    if (this.product.image) {
      formData.append('image', this.product.image);
    }

    this.rentService.addProduct(formData).subscribe(response => {
      Swal.fire({
        title: 'Success!',
        text: 'Product added successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      console.log('Product added:', response);
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: 'There was an error adding the product.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error adding product:', error);
    });
  }
}

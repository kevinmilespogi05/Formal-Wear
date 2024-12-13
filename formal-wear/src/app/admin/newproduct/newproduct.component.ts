import { Component } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent {
  product = {
    name: '',
    price: '',
    description: '',
    image: null
  };
  message: string = '';

  constructor(private rentService: RentService, private router: Router) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.image = file;  // Store the image file
    }
  }

  addProduct() {
    if (!this.product.name || !this.product.price || !this.product.description || !this.product.image) {
      this.message = 'Please fill in all fields.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price);
    formData.append('description', this.product.description);
    formData.append('image', this.product.image);

    this.rentService.addProduct(formData).subscribe(
      (response) => {
        this.message = response.message;
        if (response.message === 'Product added successfully.') {
          this.router.navigate(['/productlist']);  // Navigate to product list
        }
      },
      (error) => {
        this.message = 'Error adding product. Please try again.';
      }
    );
  }
}

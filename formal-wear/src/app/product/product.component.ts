import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/e-comm.service';
import { CommonModule } from '@angular/common';
import { Cart } from '../models/cart.models';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
    products: Product[] | undefined;
    allProducts: Product[] | undefined;
    productForm: FormGroup = new FormGroup({});
    baseUrl: string = 'http://localhost/formal-images/';
    updateMode = false;
    updateForm: FormGroup = new FormGroup({});
    selectedProductId: number | null = null;
    carts: Cart[] | undefined;

    imageUrl = '';
    imageAlt = '';
    isModalOpen = false;
    selectedProduct: Product | undefined;

    openModal(product: Product) {
        this.selectedProduct = product;
        this.isModalOpen = true;
    }

    selectProduct(product: Product) {
        this.selectedProduct = product;
    }


    closeModal() {
        this.isModalOpen = false;
        this.selectedProduct = undefined;
    }


    constructor(private productService: ProductService, public authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.productForm = new FormGroup({
            name: new FormControl(''),
            price: new FormControl(''),
            description: new FormControl(''),
            image: new FormControl(''),
        });

        this.updateForm = new FormGroup({
            name: new FormControl(''),
            price: new FormControl(''),
            description: new FormControl(''),
            image: new FormControl(''),
        });

        this.getProducts();
        this.getAllProducts();
        this.getCarts();
    }

    goToCart() {
        this.router.navigate(['/cart']);
    }

    goToProduct() {
        this.router.navigate(['/product']);
    }

    goToProductListing() {
        this.router.navigate(['/product-listing']);
    }

    logout() {
        this.authService.logout().subscribe(
            () => {
                console.log('Logged out successfully');
                this.router.navigate(['/login']);  // Redirect to login page
            },
            (error) => {
                console.error('Error during logout', error);
            }
        );
    }

    getImageUrl(image: string): string {
        return this.baseUrl + image;
    }

    getProducts(): void {
        this.productService.getProducts().subscribe((response: any) => {
            this.products = response.records;
        });
    }

    getAllProducts(): void {
        this.productService.getAllProducts().subscribe((response: any) => {
            this.allProducts = response.records;
        });
    }

    getCarts(): void {
        this.productService.getCarts().subscribe((response: any) => {
            this.carts = response.records;
        });
    }

    onFileChange(event: any): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.productForm.patchValue({
                image: file
            });
            if (this.updateMode) {
                this.updateForm.patchValue({
                    image: file
                });
            }
        }
    }

    createProduct(): void {
        if (this.productForm.valid) {
            const formData = new FormData();
            formData.append('name', this.productForm.value.name);
            formData.append('price', this.productForm.value.price);
            formData.append('description', this.productForm.value.description);
            formData.append('image', this.productForm.value.image);

            this.productService.createProduct(formData).subscribe((response: any) => {
                console.log('Product created:', response);
                this.getProducts();
                this.getAllProducts();
            }, (error: any) => {
                console.error('Error creating product:', error);
            });
        } else {
            console.error('Form is invalid');
        }
    }

    readOneProduct(productId: number): void {
        this.productService.readOneProduct(productId).subscribe((response: any) => {
            console.log(response);
        });
    }

    updateProduct(): void {
        if (this.updateForm.valid && this.selectedProductId !== null) {
            const formData = new FormData();
            formData.append('name', this.updateForm.value.name);
            formData.append('price', this.updateForm.value.price);
            formData.append('description', this.updateForm.value.description);
            if (this.updateForm.value.image) {
                formData.append('image', this.updateForm.value.image);
            }

            this.productService.updateProduct(this.selectedProductId, formData).subscribe((response: any) => {
                console.log('Product updated:', response);
                this.getProducts();
                this.getCarts();
                this.getAllProducts();
                this.updateMode = false;
                this.selectedProductId = null;
            }, (error: any) => {
                console.error('Error updating product:', error);
            });
        } else {
            console.error('Form is invalid or no product selected');
        }
    }

    toggleUpdateMode(product: Product) {
        this.updateMode = !this.updateMode;
        this.selectedProductId = product.id;
        if (this.updateMode) {
            this.updateForm.patchValue({
                name: product.name,
                price: product.price,
                description: product.description,
                image: null
            });
        }
    }

    deleteProduct(productId: number): void {
        this.productService.deleteProduct(productId).subscribe((response: any) => {
            console.log('Product deleted:', response);
            this.getProducts();
            this.getCarts();
            this.getAllProducts();
        });
    }

    addProductToCart(productId: number, quantity: number): void {
        this.productService.createCart(productId, quantity).subscribe((response: any) => {
            console.log('Cart created:', response);
            this.getCarts();
        });
    }

    updateCart(cart: Cart): void {
        this.productService.updateCart(cart.id, cart).subscribe((response: any) => {
            console.log('Cart updated:', response);
            this.getCarts();
        });
    }

    deleteCart(cartId: number): void {
        this.productService.deleteCart(cartId).subscribe((response: any) => {
            console.log('Cart deleted:', response);
            this.getCarts();
        });
    }

    calculateTotal(): number {
        return this.carts?.reduce((total, cart) => total + cart.price * cart.quantity, 0) ?? 0;
    }
}

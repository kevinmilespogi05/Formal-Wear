import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentService {

  private apiUrl = 'http://localhost/Formal-Wear/rentapi/api';

  constructor(private http: HttpClient) { }

  // Login user
  loginUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login.php`, user);
  }

  // Register user (existing method)
  registerUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register.php`, user);
  }

  addProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/addProduct.php`, productData);
  }
  
  // Method to get all products
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/manage_products.php`);
  }

  // Method to delete a product
  deleteProduct(productId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/product/deleteProduct.php`, { id: productId });
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/getUsers.php`);
  }

  createRental(rentalData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rental/createRental.php`, rentalData);
  }
}

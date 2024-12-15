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

  getAvailableProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product/getAvailableProducts.php`);
  }
  
  createRental(rentalData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rent/createRental.php`, rentalData);
  }

  // Method to confirm rental
  confirmRental(rentalId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rent/confirmRental.php`, { rental_id: rentalId });
  }

  // Method to decline rental
  declineRental(rentalId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rent/declineRental.php`, { rental_id: rentalId });
  }

  // Get all rentals for a user, including product details
  getUserRentals(userId: number): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/rent/getRentedProducts.php`, { user_id: userId });
  }
  

  // Cancel a rental
  cancelRental(rentalId: number): Observable<any> {
    console.log('Sending rental_id:', rentalId);  // Debugging log
    return this.http.post<any>(`${this.apiUrl}/rent/cancelRental.php`, { rental_id: rentalId });
  }
  
  // Method to get all rentals for admin
  getAllRentals(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/rent/getAllRentals.php`);
  }

  processPayment(paymentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/payment/processPayment.php`, paymentData);
  }
  
  getUserById(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/get_profile.php`, { user_id: userId });
  }

  updateRentalStatus(rentalId: number, status: string): Observable<any> {
    const payload = { status };
    return this.http.put(`${this.apiUrl}/rent/rent/${rentalId}/status`, payload);
  }
  
  // Fetch analytics data
  getAnalytics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/analytics.php`);
  }
}

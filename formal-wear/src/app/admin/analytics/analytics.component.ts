import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  usersCount: number = 0;      // Declare with an initial value
  rentalsCount: number = 0;    // Declare with an initial value
  productsCount: number = 0;   // Declare with an initial value
  chart: any;                  // For the Chart.js instance

  constructor(private rentService: RentService) {}

  ngOnInit(): void {
    this.fetchAnalytics(); // Call the method to fetch analytics data
  }

  fetchAnalytics(): void {
    this.rentService.getAnalytics().subscribe(
      (data) => {
        this.usersCount = data.users;      // Assign fetched values
        this.rentalsCount = data.rentals; // Assign fetched values
        this.productsCount = data.products; // Assign fetched values

        this.createChart(); // Initialize the chart
      },
      (error) => {
        console.error('Error fetching analytics:', error); // Handle errors
      }
    );
  }

  createChart(): void {
    const ctx = document.getElementById('analyticsChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Users', 'Rentals', 'Products'],
        datasets: [{
          label: 'Count',
          data: [this.usersCount, this.rentalsCount, this.productsCount],
          backgroundColor: ['#3498db', '#2ecc71', '#e74c3c']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' }
        }
      }
    });
  }
}

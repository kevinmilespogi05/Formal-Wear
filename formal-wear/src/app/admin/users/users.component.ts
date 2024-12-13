import { Component, OnInit } from '@angular/core';
import { RentService } from '../../services/rent.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private rentService: RentService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.rentService.getUsers().subscribe(
      (data) => {
        if (data && data.users) {
          this.users = data.users;
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}

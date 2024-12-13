import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule],  // Include RouterModule here
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']  // Fix the typo in styleUrl -> styleUrls
})
export class SidenavComponent {
  // Your component logic
}

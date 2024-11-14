import { Component } from '@angular/core';

@Component({
  selector: 'app-metrics-overview',
  standalone: true,
  imports: [],
  templateUrl: './metrics-overview.component.html',
  styleUrl: './metrics-overview.component.css'
})
export class MetricsOverviewComponent {
  totalUsers = 100;
  totalProducts = 10000;
  itemsInCart = 500;
  salesToday = 1000;
}

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { Holding } from '../../models/holding.model';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './portfolio-list.component.html',
})
export class PortfolioListComponent implements OnInit {
  userId = 1; // hardcoded for testing
  holdings = signal<Holding[]>([]);
  editingId: number | null = null;
  editUnits: number | null = null;

  constructor(
    private portfolioService: PortfolioService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadHoldings();
  }

  loadHoldings(): void {
    this.portfolioService.getHoldings(this.userId).subscribe({
      next: (list) => this.holdings.set(list),
      error: () => this.alertService.showError('Failed to load holdings'),
    });
  }

  startEdit(holding: Holding): void {
    this.editingId = holding.id!;
    this.editUnits = holding.units;
  }

  saveEdit(holding: Holding): void {
    if (!this.editUnits || this.editUnits <= 0) {
      this.alertService.showError('Units must be greater than 0');
      return;
    }

    this.portfolioService
      .updateHolding(this.userId, holding.id!, { units: this.editUnits })
      .subscribe({
        next: (updated) => {
          this.alertService.showSuccess('Holding updated successfully');
          this.editingId = null;
          this.editUnits = null;
          this.loadHoldings();
        },
        error: () => this.alertService.showError('Failed to update holding'),
      });
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editUnits = null;
  }

  deleteHolding(holding: Holding): void {
    if (!confirm('Are you sure you want to delete this holding?')) return;

    this.portfolioService.deleteHolding(this.userId, holding.id!).subscribe({
      next: () => {
        this.alertService.showSuccess('Holding deleted successfully');
        this.loadHoldings();
      },
      error: () => this.alertService.showError('Failed to delete holding'),
    });
  }

  navigateToAdd(): void {
    this.router.navigate(['/portfolio/add']);
  }
}

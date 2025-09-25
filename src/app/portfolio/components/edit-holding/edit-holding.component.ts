import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { Holding, UpdateHoldingRequest } from '../../models/holding.model';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-edit-holding',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-holding.component.html',
})
export class EditHoldingComponent implements OnInit {
  userId = 1;
  holdingId!: number;
  holding = signal<Holding | null>(null);
  units: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private portfolioService: PortfolioService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.holdingId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.holdingId) {
      this.alertService.showError('Invalid holding ID');
      return;
    }

    this.portfolioService.getHoldings(this.userId).subscribe({
      next: (list) => {
        const h = list.find((h) => h.id === this.holdingId);
        if (!h) {
          this.alertService.showError('Holding not found');
          return;
        }
        this.holding.set(h);
        this.units = h.units;
      },
      error: () => this.alertService.showError('Failed to load holdings'),
    });
  }

  saveEdit(): void {
    if (!this.units || this.units <= 0) {
      this.alertService.showError('Units must be greater than 0');
      return;
    }

    const data: UpdateHoldingRequest = { units: this.units };
    this.portfolioService
      .updateHolding(this.userId, this.holdingId, data)
      .subscribe({
        next: () => {
          this.alertService.showSuccess('Holding updated successfully');
          this.router.navigate(['/portfolio/list']);
        },
        error: () => this.alertService.showError('Failed to update holding'),
      });
  }

  cancel(): void {
    this.router.navigate(['/portfolio/list']);
  }
}

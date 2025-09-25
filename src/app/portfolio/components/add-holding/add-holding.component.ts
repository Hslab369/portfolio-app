import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { AddHoldingRequest, Holding } from '../../models/holding.model';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-add-holding',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-holding.component.html',
})
export class AddHoldingComponent implements OnInit {
  userId = 1;
  mfName = '';
  navName = '';
  fundType: 'Equity' | 'Debt' | 'Hybrid' | 'Others' = 'Equity';
  units: number | null = null;

  navList = signal<any[]>([]);

  constructor(
    private portfolioService: PortfolioService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.portfolioService.getNavList().subscribe({
      next: (data) => this.navList.set(data),
      error: () => this.alertService.showError('Failed to load NAV list'),
    });
  }

  addHolding(): void {
    if (!this.mfName || !this.navName || !this.units || this.units <= 0) {
      this.alertService.showError('Please fill all fields correctly');
      return;
    }

    const newHolding: AddHoldingRequest = {
      mfName: this.mfName,
      navName: this.navName,
      fundType: this.fundType,
      units: this.units,
    };

    this.portfolioService.addHolding(this.userId, newHolding).subscribe({
      next: (holding: Holding) => {
        this.alertService.showSuccess('Holding added successfully');
        this.router.navigate(['/portfolio/list']);
      },
      error: () => this.alertService.showError('Failed to add holding'),
    });
  }
}

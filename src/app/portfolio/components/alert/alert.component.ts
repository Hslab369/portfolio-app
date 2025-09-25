// src/app/components/alert/alert.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="alertService.alert()" class="container mt-2">
      <div
        class="alert"
        [ngClass]="{
          'alert-success': alertService.alert()?.type === 'success',
          'alert-danger': alertService.alert()?.type === 'error'
        }"
        role="alert"
      >
        {{ alertService.alert()?.message }}
        <button type="button" class="btn-close float-end" aria-label="Close" (click)="alertService.clear()"></button>
      </div>
    </div>
  `,
})
export class AlertComponent {
  constructor(public alertService: AlertService) {}
}

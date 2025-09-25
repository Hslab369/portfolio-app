// src/app/services/alert.service.ts
import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error';

export interface Alert {
  message: string;
  type: AlertType;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alert = signal<Alert | null>(null);

  get alert() {
    return this._alert;
  }

  showSuccess(message: string) {
    this._alert.set({ message, type: 'success' });
    this.autoClear();
  }

  showError(message: string) {
    this._alert.set({ message, type: 'error' });
    this.autoClear();
  }

  clear() {
    this._alert.set(null);
  }

  private autoClear(timeout = 5000) {
    setTimeout(() => this.clear(), timeout);
  }
}

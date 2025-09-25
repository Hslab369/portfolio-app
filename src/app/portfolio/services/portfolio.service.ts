import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Holding, AddHoldingRequest, UpdateHoldingRequest } from '../models/holding.model';
import { MockBackendService } from './mock-backend.service';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  constructor(private backend: MockBackendService) {}

  getNavList(): Observable<any[]> {
    return this.backend.getNavList();
  }

  getHoldings(userId: number): Observable<Holding[]> {
    return this.backend.getHoldings(userId);
  }

  addHolding(userId: number, data: AddHoldingRequest): Observable<Holding> {
    return this.backend.addHolding(userId, data);
  }

  updateHolding(userId: number, holdingId: number, data: UpdateHoldingRequest): Observable<Holding> {
    return this.backend.updateHolding(userId, holdingId, data.units);
  }

  deleteHolding(userId: number, holdingId: number): Observable<void> {
    return this.backend.deleteHolding(userId, holdingId);
  }
}

// src/app/portfolio/services/mock-backend.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Holding, AddHoldingRequest } from '../models/holding.model';

@Injectable({ providedIn: 'root' })
export class MockBackendService {
  private navList = [
    {
      sdId: 'HDFC001',
      mfName: 'HDFC Equity Fund',
      fundType: 'Equity',
      navName: 'HDFC_T100_NAV',
      latestValue: 125.5,
    },
    {
      sdId: 'ICICI001',
      mfName: 'ICICI Balanced Fund',
      fundType: 'Hybrid',
      navName: 'ICICI_H200_NAV',
      latestValue: 98.2,
    },
    {
      sdId: 'SBI001',
      mfName: 'SBI Debt Fund',
      fundType: 'Debt',
      navName: 'SBI_D300_NAV',
      latestValue: 105.7,
    },
  ];

  private holdings: Holding[] = [
    {
      id: 1,
      userId: 1,
      mfName: 'HDFC Equity Fund',
      fundType: 'Equity', 
      navName: 'HDFC_T100_NAV',
      units: 10,
      latestValue: 125.5,
    },
    {
      id: 2,
      userId: 1,
      mfName: 'ICICI Balanced Fund',
      fundType: 'Hybrid', 
      navName: 'ICICI_H200_NAV',
      units: 20,
      latestValue: 98.2,
    },
  ];

  getNavList(): Observable<any[]> {
    return of(this.navList);
  }

  getHoldings(userId: number): Observable<Holding[]> {
    const list = this.holdings.filter((h) => h.userId === userId);
    return of(list);
  }

  addHolding(userId: number, data: AddHoldingRequest): Observable<Holding> {
    const exists = this.holdings.find(
      (h) => h.userId === userId && h.navName === data.navName
    );
    if (exists) return throwError(() => new Error('Holding already exists'));

    const newHolding: Holding = {
      id: this.holdings.length + 1,
      userId,
      mfName: data.mfName,
      navName: data.navName,
      fundType: data.fundType,
      units: data.units,
      latestValue:
        this.navList.find((n) => n.navName === data.navName)?.latestValue || 0,
    };
    this.holdings.push(newHolding);
    return of(newHolding);
  }

  updateHolding(
    userId: number,
    holdingId: number,
    units: number
  ): Observable<Holding> {
    const h = this.holdings.find(
      (x) => x.id === holdingId && x.userId === userId
    );
    if (!h) return throwError(() => new Error('Holding not found'));
    h.units = units;
    return of(h);
  }

  deleteHolding(userId: number, holdingId: number): Observable<void> {
    const index = this.holdings.findIndex(
      (x) => x.id === holdingId && x.userId === userId
    );
    if (index === -1) return throwError(() => new Error('Holding not found'));
    this.holdings.splice(index, 1);
    return of(void 0);
  }
}

export type FundType = 'Equity' | 'Debt' | 'Hybrid' | 'Others';

export interface Holding {
  id: number; // PK of holding row
  mfName: string; // snapshot, dropdown from NAV
  fundType: FundType; // snapshot, enum shown in frontend
  navName: string; // snapshot, dropdown from NAV
  units: number;

  latestValue: number; // optional, comes from backend
  userId: number; // ← add this
}

export interface AddHoldingRequest {
  mfName: string;
  fundType: FundType;
  navName: string;
  units: number;
}

export interface UpdateHoldingRequest {
  units: number;
}

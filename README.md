## ✅ Todo Steps for Portfolio Management Screen (Angular 19)

### 1. Setup & Structure

* [-] Create feature module: `portfolio/`
* [-] Add routing: `/portfolio` route guarded by `auth.guard.ts`
* [-] Generate base components:

  * `portfolio-list`
  * `add-holding`
  * `edit-holding`
* [-] Create `portfolio.service.ts` to call backend APIs

---

### 2. Portfolio List Screen

* [-] Table to show holdings:

  * Fund Name
  * Fund Type
  * NAV Name
  * Units
  * Current Value (from API)
* [-] Action buttons per row:

  * Edit (inline form for units)
  * Delete (confirmation → remove)
* [-] "Add Holding" button → opens `add-holding` form

---

### 3. Add Holding Component

* [ ] Dropdowns for:

  * `mfName`
  * `fundType`
  * `navName`
* [ ] Input for `units`
* [ ] Validation: units > 0
* [ ] On submit → `portfolioService.addHolding()`

---

### 4. Edit Holding Component

* [ ] Inline row editing
* [ ] Read-only: fundName, fundType, navName
* [ ] Editable: units
* [ ] Save → `portfolioService.updateHolding()`

---

### 5. Delete Holding

* [ ] Delete action per row
* [ ] Confirmation dialog
* [ ] Call → `portfolioService.deleteHolding()`

---

### 6. Service Integration (`portfolio.service.ts`)

* [ ] `getHoldings(): Observable<Holding[]>`
* [ ] `addHolding(data: AddHoldingRequest)`
* [ ] `updateHolding(id: number, data: UpdateHoldingRequest)`
* [ ] `deleteHolding(id: number)`

---

### 7. UI Polish

* [ ] Use Angular Material table & form controls
* [ ] Toast messages for success/error
* [ ] Loading spinner for API calls
* [ ] Handle API errors gracefully

---

### 8. Testing

* [ ] Unit test components with mocked services
* [ ] Verify validation rules (units > 0, no duplicate holdings)
* [ ] Integration test with backend stub (optional)

---

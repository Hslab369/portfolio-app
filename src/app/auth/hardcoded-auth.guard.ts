// src/app/auth/hardcoded-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class HardcodedAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    // Basic hardcoded check for testing. Replace with real AuthGuard later.
    // This checks localStorage.userId or falls back to a hardcoded userId.
    const stored = localStorage.getItem('userId') || '1';
    const userId = stored && Number(stored);

    if (userId && !Number.isNaN(userId)) {
      // allow
      return true;
    }

    // if not authenticated, navigate to signin or block
    // here we redirect to signin path if present; otherwise block
    return this.router.parseUrl('/signin'); // change if your signin is different
  }
}

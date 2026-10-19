import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    return sessionStorage.getItem('edutrack-session') === 'active'
      ? true
      : this.router.parseUrl('/login');
  }
}

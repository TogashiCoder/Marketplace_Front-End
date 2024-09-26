import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    // Optionally, check for roles
    const userRole = authService.getUserRole();

    // Get required role from route data if specified
    const requiredRole = route.data?.['role'] as string;

    // If the route requires a specific role, check it
    if (requiredRole && userRole !== requiredRole) {
      // User doesn't have the required role, redirect to unauthorized page or login
      router.navigate(['/unauthorized']);
      return false;
    }

    return true; // User is authenticated and has required role (if specified)
  } else {
    // User is not authenticated, redirect to login page
    router.navigate(['/login']);
    return false;
  }
};

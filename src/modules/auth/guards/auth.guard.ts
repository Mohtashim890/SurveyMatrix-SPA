import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(): boolean {
        // if(this.authService.isAdminUser()) {
        //     return true;
        //  }

        //  this.router.navigate(['/auth/login']);
        //  alert('Only admins are allowed to sign in!!');
        //  localStorage.removeItem('token');
        return false;
    }
}

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@modules/auth/services';
import { Observable, of } from 'rxjs';

@Injectable()
export class DashboardGuard implements CanActivate {
    constructor() {}

    canActivate(): boolean {
        return true;
    }
}

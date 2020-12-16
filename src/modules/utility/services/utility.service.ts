import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '@modules/auth/services';
import { Observable } from 'rxjs';

@Injectable()
export class UtilityService {
    
    constructor(private http: HttpClient) {}

    get version$(): Observable<string> {
        return this.http.get('/assets/version', { responseType: 'text' });
    }

}

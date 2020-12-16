import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';

@Injectable()
export class AuthService {
    baseUrl = 'http://localhost:5000/auth/';
    jwtHelperService = new JwtHelperService();
    decodedToken: any;

    constructor(private http: HttpClient) {}

    getAuth$(): Observable<{}> {
        return of({});
    }

    /* Summary:
            The method is used to send login request and store token (server response) in local storage */
    login(user: User) {
        return this.http.post(this.baseUrl + 'login', user)
            .pipe(
                map((response: any) => {
                    const userToken = response;
                    if(user) {
                        localStorage.setItem('token', userToken.token);
                        this.decodedToken = this.jwtHelperService.decodeToken(userToken.token);
                        console.log(this.decodedToken);
                    }
                })
            )
    }

    /* Summary:
            Returns 'false' If the token is not stored in localStorage or it is expired */
    loginStatus() {
        const token = localStorage.getItem('token');
        if(token != null)
            return !this.jwtHelperService.isTokenExpired(token);
    }

    /* Summary:
            Returns true if user is Admin */
    // isAdminUser() {
    //     if(this.decodedToken.role.isArray()) {
    //         this.decodedToken.role.forEach((element:any) => {
    //             console.log(element);
    //             if(element == 'Admin') {
    //                 return true;
    //             }
    //         });
    //     }
    //     if(this.decodedToken.role == "Admin")
    //         return true;
    //     return false;
    // }
}

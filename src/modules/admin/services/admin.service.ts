import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserForAdmin } from '../models';

const httpOptions = {
    headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
};

@Injectable()
export class AdminService {
    baseUrl = 'http://localhost:5000/admin/';
    constructor(private http: HttpClient) {}

    getAdmin$(): Observable<{}> {
        return of({});
    }

    getUsersWithRoles() {
       return this.http.get(this.baseUrl + 'usersWithRoles', httpOptions);
    }

    updateUserRoles(user: UserForAdmin, roles: any) {
        return this.http.post(this.baseUrl + 'editRoles/' + user.username, roles, httpOptions);
    }

}

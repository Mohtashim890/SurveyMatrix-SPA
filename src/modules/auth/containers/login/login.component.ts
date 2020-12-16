import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '@modules/auth/guards';
import { User } from '@modules/auth/models';
import { AuthService } from '@modules/auth/services';

@Component({
    selector: 'sb-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './login.component.html',
    styleUrls: ['login.component.scss'],
})
export class LoginComponent implements OnInit {
    user: User = {username: '', password: ''}
    constructor(private authService: AuthService, private router: Router, private guard: AuthGuard) {}
    ngOnInit() {}

    login() {
        console.log(this.user);
        this.authService.login(this.user).subscribe((response: any) => {
            console.log("logged in successful");
            console.log(response);
        }, (error) => {
            console.log(error);
        }, () => {
            // if(this.guard.canActivate())
                this.router.navigate(['/dashboard']);
        });
    }
}

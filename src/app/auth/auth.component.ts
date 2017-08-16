import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    email: string;
    password: string;

    constructor(private service: AuthService) { }

    login() {
        this.service.signinUser(this.email, this.password);
    }

    register() {
        this.service.signupUser(this.email, this.password);
    }

}
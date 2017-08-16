import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class GuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            // return this.af.auth.map((auth) => {
            //     if (auth == null) {
            //         this.router.navigate(['/login']);
            //         return false;
            //     } else {
            //         return true;
            //     }
            // }).first()
            console.log(this.authService.authState);
            this.router.navigate(['/auth']);
            return false;
        }
}

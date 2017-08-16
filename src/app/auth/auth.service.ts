import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

    constructor(private router: Router) { }

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(error => console.log(error));
    }

    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
            response => {
                this.router.navigate(['/rooms']);
                firebase.auth().currentUser.getIdToken()
                    .then(token => localStorage.setItem('tokenId', JSON.stringify({ token: token })));
            })
            .catch(error => console.error(error));
    }

    logout() {
        firebase.auth().signOut();
        localStorage.clear();
        this.router.navigate(['/login']);
    }

    isAuthenticated() {
        return localStorage.getItem('tokenId');
    }
}

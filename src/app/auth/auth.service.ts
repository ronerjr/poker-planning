import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    authState: any;

    constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase) {
        this.firebaseAuth.authState.subscribe((auth) => {
            this.authState = auth;
        });
    }

    get authenticated(): boolean {
        return this.authState !== null;
    }

    anonymousLogin() {
        return this.firebaseAuth.auth.signInAnonymously()
            .then((user) => {
                this.authState = user;
                this.updateUserData();
            })
            .catch(error => console.log(error));
    }

    private updateUserData(): void {
        // Writes user name and email to realtime db
        // useful if your app displays information about users or for admin features

        const path = `users/${this.currentUserId}`; // Endpoint on firebase
        const data = {
            email: this.authState.email,
            name: this.authState.displayName
        }

        this.db.object(path).update(data)
            .catch(error => console.log(error));

    }

    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }
}
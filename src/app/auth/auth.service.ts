import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    authState: any;

    constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) { }

    /**
   * Calls the AngularFire2 service to register a new user
   * @param model
   * @returns {firebase.Promise<void>}
   */
    registerUser(email, password) {
        return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
    }

    /**
     * Saves information to display to screen when user is logged in
     * @param uid
     * @param model
     * @returns {firebase.Promise<void>}
     */
    saveUserInfoFromForm(uid, name, email) {
        return this.db.object('registeredUsers/' + uid).set({
            name: name,
            email: email,
        });
    }

    /**
    * Logs the user in using their Email/Password combo
    * @param email
    * @param password
    * @returns {firebase.Promise<FirebaseAuthState>}
    */
    loginWithEmail(email, password) {
        return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password).then(
            (success) => {
                this.router.navigate(['/rooms']);
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
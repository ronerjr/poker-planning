import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {
  MdIconModule,
  MdButtonModule,
  MdListModule,
  MdDialogModule,
  MdInputModule,
  MdSnackBarModule,
  MdProgressBarModule,
  MdTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { AppRoutingModule } from './app.routing';
import { RoomsService } from './rooms/rooms.service';
import { GuardService } from 'app/auth/guard.service';
import { AuthService } from 'app/auth/auth.service';
import { RoomComponent } from './rooms/room/room.component';
import { AddRoomComponent } from './rooms/room/add/add-room.component';
import { PwdRoomComponent } from './rooms/room/password/pwd-room.component';
import { RoomResolve } from './rooms/room/room.resolve';
import { AuthComponent } from './auth/auth.component';
import * as firebase from 'firebase';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RoomsComponent,
    RoomComponent,
    AddRoomComponent,
    PwdRoomComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MdListModule,
    MdIconModule,
    MdButtonModule,
    MdDialogModule,
    MdInputModule,
    MdSnackBarModule,
    MdProgressBarModule,
    MdTooltipModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    GuardService,
    RoomResolve,
    RoomsService
  ],
  entryComponents: [
    AddRoomComponent,
    PwdRoomComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material/';
import { Subscription } from 'rxjs/Subscription';
import { FirebaseListObservable } from 'angularfire2/database';

import { RoomsService } from './rooms.service';
import { RoomComponent } from './room/room.component';
import { AddRoomComponent } from './room/add/add-room.component';
import { PwdRoomComponent } from './room/password/pwd-room.component';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: FirebaseListObservable<any[]>;
  room: {};
  private sub: Subscription;

  constructor(public dialog: MdDialog, private service: RoomsService, private authService: AuthService) { }

  ngOnInit() {
    this.rooms = this.service.getRooms();
  }

  onClickRoom(room, mode) {
    const dialogRef = this.dialog.open(PwdRoomComponent, {
      data: { room: room, mode: mode },
      height: '250px',
      width: '400px'
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      height: '400px',
      width: '600px',
    });
  }

  logout() {
    this.authService.logout();
  }

}

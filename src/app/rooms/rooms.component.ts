import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2/database';
import { MdDialogRef, MdDialog } from '@angular/material/';

import { RoomsService } from './rooms.service';
import { RoomComponent } from './room/room.component';
import { AddRoomComponent } from './room/add/add-room.component';
import { PwdRoomComponent } from './room/password/pwd-room.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: any[];
  room: {};

  constructor(public dialog: MdDialog, private service: RoomsService) { }

  ngOnInit() {
    this.service.getRooms().subscribe(res => this.rooms = res);
  }

  onClickRoom(room, mode) {
    const dialogRef = this.dialog.open(PwdRoomComponent, {
      data: room,
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

}
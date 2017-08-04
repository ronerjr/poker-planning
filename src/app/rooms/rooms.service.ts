import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RoomsService {

  constructor(private db: AngularFireDatabase) {
    this.getRooms();
  }

  getRooms() {
    return this.db.list('/rooms');
  }

  getRoom(key) {
    return this.db.object(`/rooms/${key}`);
  }

  addRoom(room) {
    this.db.list('/rooms').push(room).key;
  }

  removeRoom(key) {
     this.db.object(`/rooms/${key}`).remove();
  }

  updateRoom(room) {
    this.db.object(`/rooms/${room.$key}`).update(room);
  }

}

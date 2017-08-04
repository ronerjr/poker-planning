import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RoomsService } from './../rooms.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MdSnackBar } from '@angular/material';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy, AfterViewChecked {
  data: {};
  mode: string;
  room: {};
  points: number;
  votation: Map<number, number>;
  timerSubscription: Subscription;
  pointsSubscription: Subscription;

  constructor(
    private service: RoomsService,
    private route: ActivatedRoute,
    private router: Router,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {
    this.data = this.route.snapshot.data.room;
    this.room = this.data['room'];
    this.mode = this.data['mode'];
  }

  ngAfterViewChecked() {
    if (this.mode === 'display') {
      this.calculatePoints();
    }
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    } if (this.pointsSubscription) {
      this.pointsSubscription.unsubscribe();
    }
  }

  exit() {
    this.router.navigate(['/rooms']);
  }

  close() {
    this.service.removeRoom(this.room['$key']);
    this.router.navigate(['/rooms']);
  }

  calculatePoints() {
    this.pointsSubscription = this.service.getRoom(this.room['$key']).subscribe(room => {
      this.room = room;
      if (this.room['points']) {
        this.votation = new Map();
        this.room['points'].forEach(element => {
          let times = 0;
          if (this.votation.get(element)) {
            times = this.votation.get(element);
          }
          this.votation.set(element, +times + 1);
        });
      }
      this.subscribeToData();
    });
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(10000).first().subscribe(() => this.calculatePoints());
  }

  sendPoints() {
    this.service.getRoom(this.room['$key']).first().subscribe(
      room => {
        this.room = room;
        this.room['points'] = room.points || [];
        this.room['points'].push(this.points);
      },
      error => console.error(error),
      () => {
        this.points = undefined;
        this.service.updateRoom(this.room);
        this.snackBar.open('Your vote was sent', 'Wait for the next round', {
          duration: 3000
        });
      },
    );
  }

  cleanRoom() {
    this.service.getRoom(this.room['$key']).first().subscribe(
      room => {
        this.room = room;
        this.room['points'] = []
      },
      error => console.error(error),
      () => {
        this.votation = undefined;
        this.service.updateRoom(this.room);
      });
  }
}

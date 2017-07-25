import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { RoomsService } from './../rooms.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit, OnDestroy {
  room: {};
  votation: Map<number, number>;
  timerSubscription: Subscription;
  pointsSubscription: Subscription;

  constructor(private service: RoomsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.room = this.route.snapshot.data['room'];
    this.calculatePoints();
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
      this.votation = new Map();
      this.room['points'].forEach(element => {
        let times = 0;
        if (this.votation.get(element)) {
          times = this.votation.get(element);
        }
        this.votation.set(element, +times + 1);
      });
      this.subscribeToData();
    });
  }

  subscribeToData() {
    this.timerSubscription = Observable.timer(10000).first().subscribe(() => this.calculatePoints());
  }

}

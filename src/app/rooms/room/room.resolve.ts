import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RoomsService } from './../rooms.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';

@Injectable()
export class RoomResolve implements Resolve<any> {

  constructor(private service: RoomsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const room = this.service.getRoom(route.params['key']);
    return new Promise((resolve, reject) => {
      room.subscribe((response) => {
        resolve({room: response, mode: route.params['mode']});
      }, reject);
    });
  }

}
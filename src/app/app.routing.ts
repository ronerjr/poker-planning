import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { GuardService } from './auth/guard.service';
import { RoomComponent } from './rooms/room/room.component';
import { RoomResolve } from './rooms/room/room.resolve';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rooms'
    },
    {
        path: 'rooms/:key/:mode',
        component: RoomComponent,
        canActivate: [GuardService],
        resolve: {
            room: RoomResolve
        }
    },
    {
        path: 'rooms',
        component: RoomsComponent,
        canActivate: [GuardService]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }

import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdSnackBar, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  templateUrl: './pwd-room.component.html'
})
export class PwdRoomComponent implements OnInit {
  password: string;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<PwdRoomComponent>,
    public snackBar: MdSnackBar,
    private router: Router) { }

  ngOnInit() {
  }

  check() {
    if (this.password === this.data.room.password.toString()) {
      this.router.navigate([`rooms/${this.data.room['$key']}`, this.data.mode]);
      this.dialogRef.close();
    } else {
      this.snackBar.open('WRONG PASSWORD!!!', 'Try again...', {
        duration: 3000
      });
    }
  }

}

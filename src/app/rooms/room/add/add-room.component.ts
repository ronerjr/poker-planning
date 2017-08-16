import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RoomsService } from './../../rooms.service';
import { MdDialogRef, MdSnackBar } from '@angular/material';

@Component({
  templateUrl: './add-room.component.html'
})
export class AddRoomComponent implements OnInit {
  room = {};
  addForm: FormGroup;

  constructor(
    public dialogRef: MdDialogRef<AddRoomComponent>,
    public snackBar: MdSnackBar,
    private service: RoomsService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      people: ['', [Validators.required, Validators.min(0), Validators.maxLength(2)]]
    });
  }

  add() {
    if (this.addForm.valid) {
      this.snackBar.open('New room added', 'Let\'s go there!', {
        duration: 3000
      });
      this.dialogRef.close();
      this.service.addRoom(this.room);
    }
  }

}

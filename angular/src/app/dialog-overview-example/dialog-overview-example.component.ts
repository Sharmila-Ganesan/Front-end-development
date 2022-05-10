import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../home-component/home-component.component';

@Component({
  selector: 'app-dialog-overview-example',
  templateUrl: './dialog-overview-example.component.html',
  styleUrls: ['./dialog-overview-example.component.css']
})
export class DialogOverviewExampleDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}

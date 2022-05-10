import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from '../dialog-overview-example/dialog-overview-example.component';
import { BlogService } from '../services/blog.service';

export interface DialogData {
  animal: string;
}

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent implements OnInit {
  
  animal?: string;
  numberOfLikes: number=0;
  title='';
  authorName='';
  data:any;
  myGroup= new FormGroup({
    filter: new FormControl(''),
  })
    constructor(private bservice : BlogService, public dialog: MatDialog,){}
    ngOnInit(){
        this.data = this.bservice.data;

    }
    likeButtonClick(){
      this.numberOfLikes++;
    }
    
    openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '250px',
        data: {animal: this.animal}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }
     
}


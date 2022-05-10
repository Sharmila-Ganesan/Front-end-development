import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';

export interface PeriodicElement {
  title: string;
  authorName: string;
  date: any;
  text: string;
}

const BlogService:PeriodicElement[]=[
  
]

@Component({
  selector: 'app-forums-component',
  templateUrl: './forums-component.component.html',
  styleUrls: ['./forums-component.component.css']
})
export class ForumsComponentComponent implements OnInit {
  displayedColumns: string[] = ['title', 'authorName', 'date', 'text'];

  dataSource=[...BlogService];
  @ViewChild(MatTable) table?: MatTable<PeriodicElement>;
  isSubmitted = new EventEmitter();
  
  data:Array<any> = [] ;

  submit(msg:any){
      this.data.push(msg);
      this.isSubmitted.emit(msg);
  }
  
   
    constructor(private bservice : ForumsComponentComponent){}
    ngOnInit(){
        this.data = this.bservice.data;

    }

}

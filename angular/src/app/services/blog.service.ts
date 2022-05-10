import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class BlogService implements OnInit {
  isSubmitted = new EventEmitter();
  data:Array<object> = [] ;
  constructor(private http:HttpClient){}

  submit(msg:any){
      this.data.push(msg);
      this.isSubmitted.emit(msg);
  }
  getPostsData(){
      return this.http.get("https://jsonplaceholder.typicode.com/posts");

  }

  ngOnInit(): void {
  }

}

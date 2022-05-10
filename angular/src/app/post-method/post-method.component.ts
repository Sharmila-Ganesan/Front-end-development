import { Component, OnInit } from '@angular/core';
import { PostMethodService } from './post-method.service';

@Component({
  selector: 'app-post-method',
  templateUrl: './post-method.component.html',
  styleUrls: ['./post-method.component.css']
})
export class PostMethodComponent {

  data={
    name: 'foo',
    mailId: 'foo@mail.com',
    userId:1
}


constructor(private _ApiService: PostMethodService){

}

onSubmit(){
this._ApiService.post(this.data).subscribe((data:any)=>{
    console.log(data);
})
}

}

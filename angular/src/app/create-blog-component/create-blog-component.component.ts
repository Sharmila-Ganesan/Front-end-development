import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

@Component({
  selector: 'app-create-blog-component',
  templateUrl: './create-blog-component.component.html',
  styleUrls: ['./create-blog-component.component.css']
})
export class CreateBlogComponentComponent{
    InTitle= "";
    message:string="";

    @Output() subevnt : EventEmitter<any> = new EventEmitter();
    constructor(private formbuilder : FormBuilder,private service: BlogService, public dialog: MatDialog){ }

    public hasError = (controlName: string, errorName: string) =>{
      return this.blogCreated.controls[controlName].hasError(errorName);
    }

  
  
  myForm= new FormGroup({
    title: new FormControl(''),
    text: new FormControl(''),
    authorName: new FormControl(''),
    date: new FormControl(''),
    category: new FormControl(''),
    tag: new FormControl('')
  });
  

  
blogCreated = this.formbuilder.group({
    title : ['',Validators.required],
    text : ['',[Validators.required]],
    authorName : ['',Validators.required],
    date : ['',Validators.required],
    category : [''],
    tag : ['']
})
submitHandler(msg:string){
  if(this.blogCreated.valid){
      this.service.submit(msg);
      this.dialog.open(DialogExampleComponent);
  }
  }
 }



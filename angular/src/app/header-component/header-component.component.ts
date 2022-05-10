import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css']
})
export class HeaderComponentComponent implements OnInit {

  @Output() sidenavToggle=  new EventEmitter();
    constructor(){

    }
    ontoggle(){
        this.sidenavToggle.emit();
    }

  ngOnInit(): void {
  }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-component',
  templateUrl: './sidenav-component.component.html',
  styleUrls: ['./sidenav-component.component.css']
})
export class SidenavComponentComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter;

  constructor(){}
  onsidenavclose(){
      this.sidenavClose.emit();
  }
  ngOnInit(): void {
    
  }

}

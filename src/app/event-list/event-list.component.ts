import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import event from './event-list.json';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  eventList;
  constructor( private router: Router) { }

  ngOnInit() {
    this.eventList = event    
  }

  searchEvent(value) {
    if(value == ''){
      this.eventList=event;
      return
    }
    this.eventList = this.eventList.filter(e => {
      return e.name.toLowerCase().includes(value.toLowerCase());
    })
  }

  bookEvent(e){    
    this.router.navigate(['./eventbook'], { queryParams: { event: JSON.stringify(e) } }, )
  }
}

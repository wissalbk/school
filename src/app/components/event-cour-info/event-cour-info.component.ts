import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-cour-info',
  templateUrl: './event-cour-info.component.html',
  styleUrls: ['./event-cour-info.component.css']
})
export class EventCourInfoComponent implements OnInit {
@Input() obj:any;
  constructor() { }

  ngOnInit(): void {
  }

}

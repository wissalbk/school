import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-info-user',
  templateUrl: './blog-info-user.component.html',
  styleUrls: ['./blog-info-user.component.css']
})
export class BlogInfoUserComponent implements OnInit {
@Input() obj:any;
  constructor() { }

  ngOnInit(): void {
  }

}

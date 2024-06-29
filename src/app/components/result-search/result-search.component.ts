import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.css']
})
export class ResultSearchComponent implements OnInit {
@Input() obj:any;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
courseTab:any=[];
  constructor(private courseService:CoursesService) { }

  ngOnInit(): void {
    this.courseService.getAllCours().subscribe((res)=>{
      console.log("here all cours :",res.courses)
      this.courseTab=res.courses;
    })
  }

}

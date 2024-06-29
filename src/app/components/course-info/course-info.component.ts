import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
id:any;
courInfo={};
  constructor(private activatedRoute:ActivatedRoute,
    private courseService:CoursesService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.courseService.getCoursesById(this.id).subscribe((res)=>{
      this.courInfo = res.cours;
    });
  }

}

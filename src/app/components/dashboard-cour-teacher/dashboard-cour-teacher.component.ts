import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-dashboard-cour-teacher',
  templateUrl: './dashboard-cour-teacher.component.html',
  styleUrls: ['./dashboard-cour-teacher.component.css']
})
export class DashboardCourTeacherComponent implements OnInit {
  myCourseTab:any=[];
  id:any;
  constructor(private coursesService:CoursesService,
    private activatedRoute : ActivatedRoute,
  private route:Router) { }

  ngOnInit(): void {
    this.getMyCours();

  }

  getMyCours(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.coursesService.getCoursesByTeachers(this.id).subscribe((res)=>{
    this.myCourseTab=res.coursesTeachers;
    console.log("here myCoursesTab:",this.myCourseTab)
    });
  }
  deleteCourse(id:any){
    this.coursesService.deleteCourByTeacher(id).subscribe((res)=>{
      console.log("here result valider teacher :",res.message);
      this.getMyCours();
    })
  }
  edit(id:any){
  this.route.navigate([`editCour/${id}`]);
  }
}

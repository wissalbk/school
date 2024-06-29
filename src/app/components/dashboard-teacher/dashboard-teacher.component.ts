import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-teacher',
  templateUrl: './dashboard-teacher.component.html',
  styleUrls: ['./dashboard-teacher.component.css']
})
export class DashboardTeacherComponent implements OnInit {
  myClasseTab:any=[];
  myCourseTab:any=[];
  id:any;
  constructor(private coursesService:CoursesService,
    private userService:UserService,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(){
  
    this.getMyClasse();
  }
  getMyClasse(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getCoursesByTeacher(this.id).subscribe((res)=>{
    this.myClasseTab = res.courseOfTeacher;
     console.log("here myClasseTab:",this.myClasseTab)
  
  });
  }
 
display(){}
deleteCourse(id:any){
  // this.coursesService.deleteCourByTeacher(id).subscribe((res)=>{
  //   console.log("here result valider teacher :",res.message)
  //  this.getMyClasse();
  // })
}
edit(){}
}

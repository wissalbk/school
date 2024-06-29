import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-tab',
  templateUrl: './courses-tab.component.html',
  styleUrls: ['./courses-tab.component.css']
})
export class CoursesTabComponent implements OnInit {
coursesTab:any=[];
  constructor(private router:Router,
    private courseServices:CoursesService ) { }

  ngOnInit() {
    // this.courseServices.getCourseStudent().subscribe((res)=>{
    //   console.log("here all courses:",res.coursesStudents);
    //   this.coursesTab =res.coursesStudents;
    //   console.log("here all courses:",this.coursesTab);
    // });
    this.getAllCourses();
  }

  getAllCourses(){
    this.courseServices.getAllCours().subscribe((res)=>{
      console.log("here courses :",res.courses)
      this.coursesTab=res.courses;
    })

  }
display(id:any){
  this.router.navigate([`courseInfo/${id}`])
}
edit(){}
deleteCourses(id:any){
  this.courseServices.deleteCourseById(id).subscribe((res)=>{
    console.log("here into BL delete course :",res.message);
   this.getAllCourses();
  })
  
}
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CourseComponent } from '../course/course.component';
import { CoursesService } from 'src/app/services/courses.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-addcours',
  templateUrl: './addcours.component.html',
  styleUrls: ['./addcours.component.css']
})
export class AddcoursComponent implements OnInit {
courForm!:FormGroup;
cours:any={};
user:any={};
userID:any;
teacherID:any;
  constructor(private coursesServise:CoursesService) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.user = jwtDecode(token);
      
    }
  }
addCours(){
  this.cours.teacherID = this.user.id;
  console.log("here user:",this.cours)
  this.coursesServise.addCourses(this.cours).subscribe((res)=>{
    console.log('cours added with success',res.message);
  });
 

}



// selectTeacherId(evt:any){
// this.teacherID = evt.target.value;
// }
}

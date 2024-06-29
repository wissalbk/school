import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses-student-tab',
  templateUrl: './courses-student-tab.component.html',
  styleUrls: ['./courses-student-tab.component.css']
})
export class CoursesStudentTabComponent implements OnInit {
user:any;
myCourseTab:any=[];
id:any;
  constructor(private userService:UserService,
    private activatedRoute :ActivatedRoute,
    private noteService:NoteService
  ) { }

  ngOnInit(): void {
    this.getToken();
   
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getMyCourses(this.id).subscribe((res)=>{
      this.myCourseTab=res.coursesStudent;
      console.log("here result of mycourses:",this.myCourseTab)

    })
  

  }

getToken(){
  let token=sessionStorage.getItem('jwt');
  if (token) {
    this.user = jwtDecode(token);
    console.log("here token :",this.user)
  }
 
}



}

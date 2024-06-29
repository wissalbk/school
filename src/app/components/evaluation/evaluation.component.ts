import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CoursesService } from 'src/app/services/courses.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluationForm!: FormGroup;
  myCourses: any = [];
  note: any = {};
  id: any;
  classeId: any;
  courId: any;
  studentId: any;
  selectedStudentId!: string;
  selectedCourStudent: any = [];
  user:any;
  constructor(private courseService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
    this.getCourseOfteacher();
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.user = jwtDecode(token);
      
    }
    //this.getStudentCour();
  }

  //add note
  evaluationByTeacher() {
    this.note.classeId = this.classeId;
    this.note.courId = this.courId;
    this.note.studentId = this.studentId;
    this.note.teacherId = this.user.id;
    console.log("here object note:", this.note)
    this.noteService.addNote(this.note).subscribe();

  }

  //class cour student 
  getCourseOfteacher() {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.userService.getCoursesByTeacher(this.id).subscribe((res) => {
      this.myCourses = res.courseOfTeacher;
      console.log("here course of teacher:", this.myCourses);
    })
  }
  // getStudentCour(){
  //   this.courseService.courStudentNote(this.courId).subscribe((res)=>{
  //     console.log("here cour student note:",res.noteCour);
  //    this.selectedCourStudent = res.noteCour
  //   })
  // }




  selectClasseId(evt: any) {
    this.classeId = evt.target.value;
    console.log("here classe id ", this.classeId)

  }




  selectCourId(evt: any) {

    this.courId = evt.target.value;
    console.log("here cour id", this.courId)
  }




  selectStudent(evt: any) {
    this.studentId = evt.target.value;
    console.log("here student id", this.studentId);
  }

}

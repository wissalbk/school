import { Component, OnInit } from '@angular/core';
import { ClassesService } from 'src/app/services/classes.service';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  classForm!: any;
  class: any = {};
  teachersTab: any = [];
  studentsTab: any = [];
  coursesTab: any = [];
  teacherId: any;
  studentId: any;
  studentIDTab: any = [];
  courseId: any;
  constructor(private classeService: ClassesService,
    private userService: UserService,
    private courseService: CoursesService
  ) { }

  ngOnInit(): void {
    this.userService.getAllTeachers().subscribe((res) => {
      console.log("here teachers tab: ", res);
      this.teachersTab = res.teachers;
    });
    this.userService.getAllStudents().subscribe((res) => {
      console.log("here students tab: ", res);
      this.studentsTab = res.students;
    });
    this.courseService.getAllCours().subscribe((res) => {
      console.log('here into getAllCourses:', res);
      this.coursesTab = res.courses;
    })
  }
  addClass() {
    // this.class.teacherID = this.teacherId;
    this.class.studentsID = this.studentIDTab;
    this.class.coursID = this.courseId;
    console.log("here classe :", this.class)
    this.classeService.addClasses(this.class).subscribe((res) => {
      console.log("classe added with success:", res.message)
    })
  }




  selectTeacherId(evt: any) {

    this.teacherId = evt.target.value;
    console.log("teacher id", this.teacherId)
  }
  selectCoursId(evt: any) {
    console.log("courses id", evt.target.value)
    this.courseId = evt.target.value;
  }
  selectStudentId(evt: any) {
    this.studentIDTab.push(evt.target.value)
    console.log("here student tab id :", this.studentIDTab);
  }
}

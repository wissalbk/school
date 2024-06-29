import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-edit-cour',
  templateUrl: './edit-cour.component.html',
  styleUrls: ['./edit-cour.component.css']
})
export class EditCourComponent implements OnInit {
cours:any={};
id:any;
coursForm!:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
    private courseService:CoursesService
  ) { }

  ngOnInit(): void {
    this.id= this.activatedRoute.snapshot.params['id'];
    this.getCourById();
  }


  getCourById(){
    this.courseService.getCourById(this.id).subscribe((res)=>{
      this.cours = res.cour;
    })
  }
  editCour(){
    this.courseService.editCourByTeacher(this.cours).subscribe((res)=>{
      console.log("here into edit cour:",res.message)
    })

  }
}

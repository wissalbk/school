import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {
  teachers:any=[];
  searchForm ={
    speciality : '',
  }

  constructor(private userService:UserService,private fBuilder:FormBuilder) { }

  ngOnInit(): void {
   
  }
 
 searchTeacher(){
  console.log("here into search Teacher FE:",this.searchForm)
  if (this.searchForm) {
    this.userService.searchTeacher(this.searchForm).subscribe((res)=>{
      console.log("here into search Teacher FE:",res.resultSearch);
      this.teachers = res.resultSearch;
    });
  }
 


 }
}

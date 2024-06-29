import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-space-parent',
  templateUrl: './space-parent.component.html',
  styleUrls: ['./space-parent.component.css']
})
export class SpaceParentComponent implements OnInit {
  searchForm!:FormGroup;
  resChild:any=[];
  constructor(private fbuilder:FormBuilder,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fbuilder.group({
      phoneNumber : ['']
    });
  }
  searchChild(){
    console.log("here object search :",this.searchForm.value)
    this.userService.searchByParent(this.searchForm.value).subscribe((res)=>{
      console.log("here result of search :",res.resultSearch);
      this.resChild = res.resultSearch;
    });
  }
}

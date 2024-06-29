import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
id:any;
userObj={};
  constructor(private userService:UserService,
    private activatedRoute :ActivatedRoute
  ) { }

  ngOnInit(){
    this.id = this.activatedRoute.snapshot.params['id'];
     this.userService.getUserById(this.id).subscribe((res)=>{
      console.log("here user info :",res.user)
      this.userObj = res.user;
     })
  }

}

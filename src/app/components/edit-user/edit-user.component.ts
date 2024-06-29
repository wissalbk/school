import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any = {};
  userForm!: FormGroup;
  decoded: any;
  constructor(private userService: UserService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('jwt');
    if (token) {
      this.decoded = jwtDecode(token);
      console.log("Here token user :", this.decoded)
    }
    this.userForm = this.formBuilder.group({

      oldPwd:["",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      newPwd:["",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confPwd:["",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
    })
  }
  editProfile() {
    this.userForm.value.userId=this.decoded.id;   
     this.userService.editProfile(this.userForm.value).subscribe((res) => {
      console.log("here response update profile", res.message);
    })
  }
  mustMatch():boolean{
    return this.userForm.value.newPwd !=  this.userForm.value.confPwd  }
}

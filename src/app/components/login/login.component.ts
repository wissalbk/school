import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user:any={};
loginForm!:FormGroup;
msg='';
  constructor(private userService:UserService,private router:Router,
  private  fbuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fbuilder.group({
      tel : ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      pwd : ['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]]
    })
  }
login(){
  let user = this.loginForm.value;
  this.userService.login(user).subscribe((res)=>{
    console.log("Here response After Login",res.message);
    if (res.message == 'welcome') {
      sessionStorage.setItem('jwt',res.user);
     let decoded :any = jwtDecode(res.user)
      console.log("Here decoded : ",decoded)
      if (decoded.role == "student") 
        {
          this.router.navigate([''])
        } 
        else if (decoded.role == "parent")
        {
          this.router.navigate([''])
        }
        else if (decoded.role == "teacher") 
        {
        
          this.router.navigate([''])
        }
       else 
        this.router.navigate(['admin'])
    }
     else if (res.message == 'wait the accept of admin')
      { this.msg = 'wait the accept of admin'  ; } 
    else 
    {
      this.msg = 'please check your phone number or your pwd';
    }
  })
}
}

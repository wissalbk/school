import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  path!: string;
  title!: string;
  signupForm!: FormGroup;
  imagePreview: any;
  msg: any;
  messageErr = '';
  constructor(private router: Router,
    private fBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.path = this.router.url;
    console.log("here into URL:", this.path);
    if (this.path == "/signupStudent") {
      this.title = "Signup Student";
    }
    else if (this.path == "/signupParent") {
      this.title = "Signup Parent";
    }
    else if (this.path == "/signupTeacher") {
      this.title = "Signup Teacher";
    }
    else
      this.title = "Signup Admin";

    this.signupForm = this.fBuilder.group({
      firstName: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      lastName: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      email: ['', [Validators.required]],
      tel: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      adresse: ['', [Validators.required]],
      pwd: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      fileUser: [''],
      phoneChild: [''],
      speciality: [''],

    })


  }

  signup() {
    let user = this.signupForm.value;
    if (this.path == "/signupStudent") {
      user.role = 'student'
    }
    else if (this.path == "/signupParent") {
      user.role = 'parent'
    }
    else if (this.path == "/signupTeacher") {
      user.role = 'teacher';
      user.statut = 'invalid'

    }
    else
      user.role = 'admin'

    console.log("here user", user);
    this.userService.addUser(user, this.signupForm.value.fileUser).subscribe((res) => {
      console.log("here into FE add user:", res.message);
      this.messageErr = res.message;
      //  this.router.navigate(['/']);




    })

  }
  onImageSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      console.log("here file :", file);
      //affecter type file de l'attribut fileUser du signup
      this.signupForm.patchValue({ fileUser: file });
      //update form 
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        //imagePreview contient path de l'image
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  checkTeacher() {
    return this.path == "/signupTeacher";
  }
  checkParent() {
    return this.path == "/signupParent";
  }
  routeLOgin(){
    this.router.navigate(['login']);
  }
}

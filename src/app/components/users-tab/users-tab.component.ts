import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-tab',
  templateUrl: './users-tab.component.html',
  styleUrls: ['./users-tab.component.css']
})
export class UsersTabComponent implements OnInit {
usersTab:any=[];

  constructor(private router:Router,
    private usersService:UserService
  ) { }

  ngOnInit() {
 
    this.getAllUsers();
  }

  getAllUsers(){
    this.usersService.getAllUsers().subscribe((res)=>{
      console.log("all teachers & students :",res.users)
        this.usersTab=res.users;
    })
  }
   display(id:any){
    
    this.router.navigate([`userInfo/${id}`])
   }
  edit(id:any){
  this.router.navigate([`editUser/${id}`])
  }
  deleteUser(id:any){
    this.usersService.deleteUserByAdmin(id).subscribe((res)=>{
      console.log("here response after delete",res.message);
      this.getAllUsers();
    })
  }
  valider(id:any,userStatut:string){
    this.usersService.validerTeachers(id,userStatut).subscribe((res)=>{
      console.log("here result valider teacher :",res.message)
      this.getAllUsers();
    })
  }
}

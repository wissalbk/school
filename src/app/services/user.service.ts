import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
userURL= 'http://localhost:3000/api/users'
  constructor(private httpClient:HttpClient) { }
  addUser(user:any ,fileUser :File){
    let fData= new FormData();
    fData.append("firstName",user.firstName);
    fData.append("lastName",user.lastName);
    fData.append("email",user.email);
    fData.append("tel",user.tel);
    fData.append("adresse",user.adresse);
    fData.append("pwd",user.pwd);
    fData.append("phonechild",user.phonechild);
    fData.append('speciality',user.speciality);
    fData.append('role',user.role);
    fData.append("statut",user.statut);
    fData.append("userFile",fileUser);
   
    return this.httpClient.post<{message:any}>(this.userURL+'/signup',fData);
  }
  login(user:any){
    return this.httpClient.post<{message:string,user:any}>(this.userURL+'/login',user)
  }

  getAllUsers(){
    return this.httpClient.get<{users:any}>(this.userURL)
  }
  getAllTeachers(){
    return this.httpClient.get<{teachers:any}>(this.userURL+'/teachers');
  }
  getAllStudents(){
    return this.httpClient.get<{students:any}>(this.userURL+'/students');
  }
  getUserById(id:any){
    return this.httpClient.get<{user:any}>(`${this.userURL}/${id}`)
  }
  deleteUserByAdmin(id:any){
    return this.httpClient.delete<{message:any}>(`${this.userURL}/${id}`);
  }
  
  validerTeachers(id:any,user:string){
    return this.httpClient.put<{message:any}>(`${this.userURL}/${id}`,user)
  }
// get all information of classe and cours by student
 getMyCourses(id:any){
  return this.httpClient.get<{coursesStudent :any}>(`${this.userURL+'/CoursesStudent'}/${id}`)
 }
 //classe of teacher with all information of cour and student by teacher
 getCoursesByTeacher(id:any){
  return this.httpClient.get<any>(`${this.userURL+'/courseTeacher'}/${id}`)
 }
 //serch child by parent
 searchByParent(obj:any){
   return this.httpClient.post<{resultSearch:any}>(this.userURL+'/searchChild',obj)
 }

 editProfile(userObj:any){
  return this.httpClient.put<{message:any}>(this.userURL+'/editProfile',userObj)
}
// search teacher by speciality
searchTeacher(obj:any){
return this.httpClient.post<{resultSearch:any}>(this.userURL+'/searchTeacher',obj)
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
coursesURL = 'http://localhost:3000/api/courses';
  constructor(private httpClient:HttpClient) { }
  addCourses(cours : any){
    return this.httpClient.post<{message:string}>(this.coursesURL,cours);
  }

  getAllCours(){
    return this.httpClient.get<{courses:any}>(this.coursesURL)
  }
  deleteCourseById(id:any){
    return this.httpClient.delete<{message:any}>(`${this.coursesURL}/${id}`)
  }
  getCoursesById(id:any){
    return this.httpClient.get<{cours:any}>(`${this.coursesURL}/${id}`)
  }

//get cours by teacher (dashboard teacher)
  getCoursesByTeachers(id:any){
    return this.httpClient.get<{coursesTeachers:any}>(`${this.coursesURL+'/coursesTeachers'}/${id}`);
  }
  // getCourseStudent(){
  //   return this.httpClient.get<{coursesStudents :any}>(this.coursesURL+'/courseStudents');
  // }
  deleteCourByTeacher(id:any){
    return this.httpClient.delete<{message:any}>(`${this.coursesURL+'/deletebyTeacher'}/${id}`)
   }

  getCourById(id:any){
    return this.httpClient.get<{cour:any}>(`${this.coursesURL+'/getCourByTeacher'}/${id}`)
      }
  editCourByTeacher(courObj:any){
    return this.httpClient.put<{message:any}>(this.coursesURL+'/editCourByTeacher',courObj)
  }

  courStudentNote(id:any){
    return this.httpClient.get<{noteCour:any}>(`${this.coursesURL+'/courbystudentNote'}/${id}`)
  }
}

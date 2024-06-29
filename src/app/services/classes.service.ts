import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  classesURL = 'http://localhost:3000/api/classes';
  constructor(private httpClient:HttpClient) { }

  addClasses(classe : any){
    return this.httpClient.post<{message:string}>(this.classesURL,classe);
  }
}

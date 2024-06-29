import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteURL= 'http://localhost:3000/api/notes'

  constructor(private httpClient:HttpClient) { }
  addNote(noteObj:any){
   return this.httpClient.post<{message:any}>(this.noteURL,noteObj)
  }
  afficherNote(id:any){
    return this.httpClient.get<{noteDocs:any}>(`${this.noteURL}/${id}`)
  }
}

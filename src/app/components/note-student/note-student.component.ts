import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note-student',
  templateUrl: './note-student.component.html',
  styleUrls: ['./note-student.component.css']
})
export class NoteStudentComponent implements OnInit {
id:any;
noteTab:any=[];
  constructor(private noteService:NoteService,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
  
      this.noteService.afficherNote(this.id).subscribe((res)=>{
       // console.log("here docsEvaluation:",res.noteDocs)
        this.noteTab= res.noteDocs;
        console.log("here docsEvaluation:",this.noteTab)

      });
  }
checkNote(n:number){
  if (n >= 16) {
    return 'Très bien';
  } else if (n >= 12) {
    return 'Bien';
  } else if (n >= 10) {
    return 'Assez bien';
  } else {
    return 'Insuffisant';
  }
}
}

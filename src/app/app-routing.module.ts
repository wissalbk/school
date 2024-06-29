import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { EventsComponent } from './components/events/events.component';
import { BlogComponent } from './components/blog/blog.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddcoursComponent } from './components/addcours/addcours.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ClassComponent } from './components/class/class.component';
import { SpaceTeacherComponent } from './components/space-teacher/space-teacher.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SpaceStudentComponent } from './components/space-student/space-student.component';
import { SpaceParentComponent } from './components/space-parent/space-parent.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { EditCourComponent } from './components/edit-cour/edit-cour.component';

const routes: Routes = [
  
  {path:"login",component:LoginComponent},
  {path:"signupParent",component:SignupComponent},
  {path:"signupStudent",component:SignupComponent},
  {path:"signupAdmin",component:SignupComponent},
  {path:"signupTeacher",component:SignupComponent},
  {path:"",component:HomeComponent},
  {path:"courses",component:CoursesComponent},
  {path:"events",component:EventsComponent},
  {path:"blog",component:BlogComponent},
  {path:"teachers",component:TeachersComponent},
  {path:"contact",component:ContactComponent},
  {path:"addCours",component:AddcoursComponent},
  {path:"admin",component:AdminComponent},
  {path:"editUser",component:EditUserComponent},
  {path:"userInfo/:id",component:UserInfoComponent},
  {path:"addclass",component:ClassComponent},
  {path:"spaceTeacher/:id",component:SpaceTeacherComponent},
  {path:"courseInfo/:id",component:CourseInfoComponent},
  {path:"spaceStudent/:id",component:SpaceStudentComponent},
  {path:"spaceParent",component:SpaceParentComponent},
  {path:"evaluation/:id",component:EvaluationComponent},
  {path:"searchTeacher",component:SearchTeacherComponent},
  {path:"editCour/:id",component:EditCourComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }

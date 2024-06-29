import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageBackgroundComponent } from './components/image-background/image-background.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { EventsComponent } from './components/events/events.component';
import { BlogComponent } from './components/blog/blog.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { SignupComponent } from './components/signup/signup.component';
import { CourseComponent } from './components/course/course.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AddcoursComponent } from './components/addcours/addcours.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersTabComponent } from './components/users-tab/users-tab.component';
import { CoursesTabComponent } from './components/courses-tab/courses-tab.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { ClassComponent } from './components/class/class.component';
import { SpaceTeacherComponent } from './components/space-teacher/space-teacher.component';
import { HttpClientModule } from '@angular/common/http';
import { BlogInfoUserComponent } from './components/blog-info-user/blog-info-user.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { EventCourInfoComponent } from './components/event-cour-info/event-cour-info.component';
import { SpaceStudentComponent } from './components/space-student/space-student.component';
import { CoursesStudentTabComponent } from './components/courses-student-tab/courses-student-tab.component';
import { SpaceParentComponent } from './components/space-parent/space-parent.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { DashboardCourTeacherComponent } from './components/dashboard-cour-teacher/dashboard-cour-teacher.component';
import { EditCourComponent } from './components/edit-cour/edit-cour.component';
import { NoteStudentComponent } from './components/note-student/note-student.component';

@NgModule({
  declarations: [
    AppComponent,
   
    FooterComponent,
    HeaderComponent,
    ImageBackgroundComponent,
    HomeComponent,
    CoursesComponent,
    TeachersComponent,
    RegisterFormComponent,
    EventsComponent,
    BlogComponent,
    LoginComponent,
    ContactComponent,
    SignupComponent,
    CourseComponent,
    TeacherComponent,
    AddcoursComponent,
    AdminComponent,
    UsersTabComponent,
    CoursesTabComponent,
    EditUserComponent,
    UserInfoComponent,
    ClassComponent,
    SpaceTeacherComponent,
    BlogInfoUserComponent,
    DashboardTeacherComponent,
    CourseInfoComponent,
    EventCourInfoComponent,
    SpaceStudentComponent,
    CoursesStudentTabComponent,
    SpaceParentComponent,
    EvaluationComponent,
    SearchTeacherComponent,
    ResultSearchComponent,
    DashboardCourTeacherComponent,
    EditCourComponent,
    NoteStudentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

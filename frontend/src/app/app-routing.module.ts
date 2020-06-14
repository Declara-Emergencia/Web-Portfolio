import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { AddProjectComponent } from './add-project/add-project.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ListComponent } from './list/list.component';
import { ProjectComponent } from './project/project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list', component: ListComponent },
  { path: 'profile/:id/add-project', component: AddProjectComponent },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id/edit-profile', component: EditProfileComponent},
  { path: 'profile/:id/project/:idP', component: ProjectComponent},
  { path: 'profile/:id/project/:idP/edit-project', component: EditProjectComponent}

  //{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

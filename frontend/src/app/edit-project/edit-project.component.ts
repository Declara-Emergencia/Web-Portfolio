import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss']
})
export class EditProjectComponent implements OnInit {
  user_id;
  project_id;
  project;
  user;

  constructor(private actRoute: ActivatedRoute, 
  private http: HttpClient, 
  public _authService: AuthService,
  private _router: Router,) {

    this.project_id = this.actRoute.snapshot.params.idP;
    this.user_id = this.actRoute.snapshot.params.id;
   }

  ngOnInit(): void {

    this.http.get<any>('http://localhost:3000/api/project/' + this.project_id)
      .subscribe(project => {
          this.project = project;
      })

    this.http.get<any>('http://localhost:3000/api/user/' + this.user_id)
      .subscribe(user => {
          this.user = user;
      })
  }

  patch(project){
    //return this.http.put<any>('http://localhost:3000/api/user/' + this.user_id, user);
    this.http.put<any>('http://localhost:3000/api/project/' + this.project_id, project).subscribe(projectE => {
      this.project = projectE;
      this._router.navigate(['/profile', this.user_id])
    })
  }

  public get logged_user_id(): string {
    return this._authService.loggedUserId;
  }
}

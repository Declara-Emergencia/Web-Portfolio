import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user_id: string;
  user;
  projects;
  project;

  constructor(private actRoute: ActivatedRoute, 
    private route: Router,
    private http: HttpClient, 
    public _authService: AuthService) {

    this.user_id = this.actRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/api/user/' + this.user_id).subscribe(user => {
            this.user = user;
        })

    this.http.get<any>('http://localhost:3000/api/user/' + this.user_id + '/projects')
        .subscribe(projects => {
            this.projects = projects;
        })
  }

  editProject(idP){
    this.route.navigate(['/profile/' + this.user_id + '/project/' + idP])
  }

  onDelete(idP){
    this.http.delete<any>('http://localhost:3000/api/project/' + idP).subscribe(project => {
      this.project = project;
    })
  }

  public get logged_user_id(): string {
    return this._authService.loggedUserId;
  }
}

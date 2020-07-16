import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
user_id;
project_id;
project;
user;

constructor(private actRoute: ActivatedRoute, 
  private http: HttpClient, 
  public _authService: AuthService) {
    
    this.project_id = this.actRoute.snapshot.params.idP;
    this.user_id = this.actRoute.snapshot.params.id;
 }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/api/user/' + this.user_id)
      .subscribe(user => {
          this.user = user;
      })

      this.http.get<any>('http://localhost:3000/api/project/' + this.project_id)
      .subscribe(project => {
          this.project = project;
      })
  }

  public get logged_user_id(): string {
    return this._authService.loggedUserId;
  }

}

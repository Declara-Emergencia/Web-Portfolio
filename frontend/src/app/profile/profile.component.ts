import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private actRoute: ActivatedRoute, private http: HttpClient, public _authService: AuthService) {
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

  public get logged_user_id(): string {
    return this._authService.loggedUserId;
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  user_id: string;
  user;

  constructor(
    private actRoute: ActivatedRoute, 
    private http: HttpClient,
    private _router: Router, 
    private _auth: AuthService) { 
    this.user_id = this.actRoute.snapshot.params.id;
   }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/api/user/' + this.user_id).subscribe(user => {
      this.user = user;
    })
  }

  patch(user){
    //return this.http.put<any>('http://localhost:3000/api/user/' + this.user_id, user);
    this.http.put<any>('http://localhost:3000/api/user/' + this.user_id, user).subscribe(usere => {
      this.user = usere;
      this._router.navigate(['/profile', this.user_id])
    })
  }
}

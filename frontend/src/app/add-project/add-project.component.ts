import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  projectData = { title: '', description: ''};
  user_id: string;

  constructor(private _router: Router,
              private http: HttpClient,
              private actRoute: ActivatedRoute) {
                this.user_id = this.actRoute.snapshot.params.id;
               }

  ngOnInit(): void {
  }

  addProject() {
    this.http.post<any>('http://localhost:3000/api/user/' + this.user_id + '/add-project', this.projectData)
    .subscribe(
      res => {
        console.log(res)
        this._router.navigate(['profile/'+ this.user_id])
      },
      err => console.log(err)
    )
  }
}

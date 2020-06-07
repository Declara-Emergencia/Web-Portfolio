import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user_id: string;

  constructor(private actRoute: ActivatedRoute) {
    this.user_id = this.actRoute.snapshot.params.id;
   }

  ngOnInit(): void {
  }

}

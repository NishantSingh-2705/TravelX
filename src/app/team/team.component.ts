import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { Subscription, timer } from 'rxjs';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  username: any;
  time = new Date();
  constructor(private router: ActivatedRoute, private userService: UserServiceService) {

  }
  id!: number;
  data = {};
  intervalId: any;
  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.id = this.router.snapshot.params['id'];
    this.getUserDetails(this.id);
  }
  getUserDetails(id: number) {
    this.userService.getUserById(this.id).subscribe((data) => {
      this.username = data.username;
      console.log(data);
    },
      (err) => console.log(err)
    );
    console.log(this.username);
  }
}

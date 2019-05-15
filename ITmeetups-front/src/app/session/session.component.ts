import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service'
import { Routes, RouterModule, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  
  public username: string;
  public password: string;
  public token: string;
  constructor(
      public backend: SessionService,
      public router: Router
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');

    if(this.token){
        this.router.navigate(['posts'])
    }
  }

  Login(){
      this.backend.getMe(this.username, this.password).then(res => {
        localStorage.setItem('token', res.token)
        this.router.navigate(['posts'])
      });
  }

  getPosts(){
      this.backend
  }
}

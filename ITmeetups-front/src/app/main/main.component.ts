import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service'
import { Routes, RouterModule, Router } from '@angular/router';
import { IPost } from '../interfaces'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  
  public posts: IPost[];

  constructor(
      public backend: SessionService,
      public router: Router
  ) { }

  ngOnInit() {
      this.getPosts();
  }

  getPosts() {
    this.backend.getPosts().then(res => { this.posts = res });
  }

  getPost(id: number) {
    // this.backend.getPost(id).then(res => { this.router.navigate[`posts/${id}`]})
    this.router.navigate(['/posts', id]);
  }

}

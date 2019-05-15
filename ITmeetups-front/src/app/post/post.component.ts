import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service'
import { IPost } from '../interfaces'
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public posts: IPost[];

  constructor(
      public backend: SessionService
  ) { }
    
  ngOnInit() {
      console.log('chchchchc');
  }

  getPosts() {
    this.backend.getPosts().then(res => { this.posts = res });
  }

}

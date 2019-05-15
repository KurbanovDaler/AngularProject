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
      public backend: SessionService
  ) { }

  ngOnInit() {
      this.getPosts();
  }

  getPosts() {
    this.backend.getPosts().then(res => { this.posts = res });
  }

}

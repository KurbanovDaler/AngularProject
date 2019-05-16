import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../session.service'
import { IPost, IComment } from '../interfaces'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { getDebugNode__POST_R3__ } from '@angular/core/src/debug/debug_node';
import { ICommandName } from 'selenium-webdriver';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

//   @Input() public id: number;
  public post: IPost;
  public comments: IComment[];
  public id: number;
  public comment_text: string;
  constructor(
      public backend: SessionService,
      public route: ActivatedRoute
  ) { }
    
  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id")
    
    this.getPost();
    this.getComments();
  }

  getPost() {
    this.backend.getPost(this.id).then(res => { this.post = res });
  }

  getComments(){
      this.backend.getComments(this.id).then(res => { this.comments = res });
  }

  addComment(){
      if(this.comment_text){
        this.backend.createComment(this.comment_text, this.id, parseInt(localStorage.getItem('user_id'))).then(res => { 
            // this.comments.unshift(res) 
            location.reload()
        });
      }
  }

}

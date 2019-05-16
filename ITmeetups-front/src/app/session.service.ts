import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends MainService {

  constructor(protected http: HttpClient) {
      super(http);
   }

   getMe(username: string, password: string): Promise<any> {
    return this.post('http://localhost:8000/api/login/', { 
      username: username, 
      password: password 
    });
  }

  getPosts(){
      return this.get('http://localhost:8000/api/posts/', {});
  }

  getPost(id: number) {
      return this.get(`http://localhost:8000/api/posts/${id}/`, {});
  }

  getComments(id: number){
      return this.get(`http://localhost:8000/api/posts/${id}/comments/`, {});
  }

  createComment(text: string, post: number, user: number){
    return this.post(`http://127.0.0.1:8000/api/posts/1/comments/`, { 
        text: text, 
        post: post, 
        user: user 
    } );
  }
}

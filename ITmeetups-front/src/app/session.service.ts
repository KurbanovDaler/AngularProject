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
}

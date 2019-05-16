import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ITmeetups-front';


  isLoggedIn(){
      return 'token' in localStorage;
  }

  logout() {
    if(localStorage.getItem('token')){
      localStorage.removeItem('token');
    }
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './httpinterceptor';
import { SessionService } from './session.service'
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { SessionComponent } from './session/session.component';

const appRoutes: Routes = [
    { path :'login', component: SessionComponent},
    { path: 'posts', component: MainComponent }, 
    { path: 'posts/:id', component: PostComponent }, 
    { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PostComponent,
    SessionComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [SessionService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

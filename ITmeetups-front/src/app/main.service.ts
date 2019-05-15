import { Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  constructor(protected http: HttpClient) { }

  private normalBody(body: any): any {
    if (!body) {
      body = {};
    }
    // for (const key in body) {
    //   if (!body.hasOwnProperty(key)) {
    //     continue;
    //   }
    // }
    return body;
  }

  private getUrlParams(body: any): HttpParams {
    let params = new HttpParams();
    for (const key in body) {
      if (!body.hasOwnProperty(key)) {
        continue;
      }
      params = params.append(key, body[key]);
    }
    return params;
  }

  get(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    const pars = this.getUrlParams(body);
    return this.http.get(uri, {params: pars}).toPromise().then(res => res);
  }

  post(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.post(uri, body).toPromise().then(res => res);
  }

  delet(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.delete(uri, body).toPromise().then(res => res);
  }

  put(uri: string, body: any): Promise<any> {
    body = this.normalBody(body);
    return this.http.put(uri, body).toPromise().then(res => res);
  }

}
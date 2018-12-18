import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Url: string = "http://localhost:3000/users";

  constructor(private http: HttpClient) { }

  public getUsers() {

    return this.http.get<Array<any>>( this.Url );

  }

  public getUser(id: string) {

    return this.http.get( `${this.Url}/${id}` );

  }
}

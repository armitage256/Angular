import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Uri : string = "http://localhost:3000/users";

  public selectedUser = null;

  public nextUserId = null;

  constructor(private http: HttpClient) { 

    this.getUsers()
      .subscribe((data) => {

        if(data.length > 0) {
          this.nextUserId = (data[ data.length - 1].id + 1);
          console.log("Próximo Id disponível: " + this.nextUserId);
        }


      });

  }


  public getUsers() {

    return this.http.get<Array<any>>(this.Uri);

  }

  public getUser(id: string) {

    return this.http.get(`${this.Uri}/${id}`);

  }

  public postUser(user: any) {

    user.id = this.nextUserId;

    let data = {
      "id" : user.id,
      "name" : user.name,
      "email" : user.email,
      "password": user.password
    };

    return this.http.post(this.Uri, JSON.stringify(data) );

  }

  public putUser(user: any) {

    let data = {
      "id" : user.id,
      "name" : user.name,
      "email" : user.email,
      "password": user.password
    };

    return this.http.put( `${this.Uri}/${user.id}` , JSON.stringify(data) );

  }

  public deleteUser(id: string) {

    return this.http.delete(`${this.Uri}/${id}`);

  }

 
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_PATH : string = "http://localhost:4200/api/";

  constructor(private _httpservice: HttpClient) { }

  getUsers(){
    return this._httpservice.get(this.BASE_PATH + "users")
  }

  deleteUser(userId : number){
    return this._httpservice.delete(`${this.BASE_PATH}users/${userId}`);
  }

  getUser(userId : number){
    return this._httpservice.get(`${this.BASE_PATH}users/${userId}`);
  }

  addUser(user : User){
    return this._httpservice.post(`${this.BASE_PATH}users`, user);
  }

  upDateUser(user: User){
    return this._httpservice.post(`${this.BASE_PATH}users/${user.id}`, user)
  }

}

import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let users: User[] = [{
      id: 1,
      title: "Mr",
      firstName: "Ashutosh",
      lastName: "Kumar",
      dob: "1998-08-02",
      email: "ashutoshk043@gmail.com",
      password: "12345",
      acceptTerms: true

    },
    {
      id: 2,
      title: "Mr",
      firstName: "Ajay",
      lastName: "Kumar",
      dob: "1998-08-02",
      email: "ajay@gmail.com",
      password: "12345",
      acceptTerms: true

    }]

    return { users }
  }
}

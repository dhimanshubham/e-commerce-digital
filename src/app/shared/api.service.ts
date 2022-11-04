import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Route, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,private router :Router) { }
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  userSignup(data :any){
    return this.http.post('http://localhost:3000/signup',data)
    // {observe : 'response'}).subscribe((res:any)=>{
    //   this.isSellerLoggedIn.next(true);
    //   this.router.navigate(['seller-home']);
    // });
  }

}

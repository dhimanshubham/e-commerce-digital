import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupform: any;
  submitted: boolean;

  constructor(private fb: FormBuilder,
    private http: HttpClient, private router: Router, private api: ApiService) {
    this.submitted = false;
  }

  ngOnInit(): void {
    this.initialiseform();
  }

  initialiseform() {

    
    this.signupform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],

    }), { validator: this.checkIfMatchingPasswords('password', 'confirmpassword') }
  }


  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  submit() {
    this.submitted = true;
    if (this.signupform.valid) {
      this.http.post<any>("http://localhost:3000/signup", this.signupform.value).subscribe((res: any) => {
        alert("signup successfully");
        console.log(res);
        this.signupform.reset();
        this.router.navigate(['signin']);

      }, err => {
        alert("something went wrong")
      });

      // this.api.userSignup(this.signupform.value).
      // subscribe((res:any)=>{
      // alert("signup successfully");
      // console.log(res);
      // this.signupform.reset();
      // this.router.navigate(['signin']);
      // });
    }
  }
}



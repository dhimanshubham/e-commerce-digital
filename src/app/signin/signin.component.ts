import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm: any;
  submitForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeform();
  }
  initializeform() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    this.submitForm = true;
    if (this.signinForm.valid) {
      this.http.get<any>('http://localhost:3000/signup').subscribe(
        (res: any) => {
          let obj = res.find(
            (x: any) =>
              x.email === this.signinForm.value.email &&
              x.password === this.signinForm.value.password
          );
          localStorage.setItem('loggedUser',JSON.stringify(obj));
          const user = res.find((a: any) => {
            return a.email === this.signinForm.value.email && a.password === this.signinForm.value.password
          });
          if (user) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'login Successfully',
              showConfirmButton: false,
              timer: 1200,
            });
            localStorage.setItem('seller', JSON.stringify(res));
            this.signinForm.reset();
            this.router.navigate(['seller-home']);
          } else {
            alert('user not found !!');
          }
        },
        (err) => {
          alert('spmething went wrong !!');
        }
      );
    }
  }
}

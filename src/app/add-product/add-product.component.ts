import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/api.service';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addProductForm: any;
  submitted: boolean;


  constructor(private fb: FormBuilder,
    private http: HttpClient, private router: Router, private api: ApiService,
    private product: ProductService) {
    this.submitted = false;
  }

  ngOnInit(): void {
    this.initialiseform();
  }

  initialiseform() {


    this.addProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.minLength(4),]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', [Validators.required]],

    })

  }

  submit() {
    this.submitted = true;
    if (this.addProductForm.valid) {
      this.product.productList(this.addProductForm.value).
        subscribe((res: any) => {
          // alert("signup successfully");
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'login Successfully',
              showConfirmButton: false,
              timer: 1200
            })
          this.addProductForm.reset();
          this.router.navigate(['seller-home']);

        }, err => {
          alert("something went wrong")
        });
    }

  }

  
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { ApiService } from '../shared/api.service';
import { ProductService } from '../shared/product.service';
import { product } from '../data-type';


@Component({
  selector: 'app-seller-update',
  templateUrl: './seller-update.component.html',
  styleUrls: ['./seller-update.component.css']
})
export class SellerUpdateComponent implements OnInit {


  updateProductForm: any;
  submitted: boolean;

  constructor(private fb: FormBuilder,
    private http: HttpClient, private router: Router, private api: ApiService,
    private product: ProductService,private route:ActivatedRoute) {
    this.submitted = false;
  }
  productItem: undefined | product



  ngOnInit(): void {
    this.initialiseform();
    this.productData();
  }

  initialiseform() {

    this.updateProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      imageUrl: ['', [Validators.required]],

    })

  }

  submit(data:product){
    this.submitted = true;
    if(this.productItem){
      data.id=this.productItem.id;
    }
    this.product.updateProduct(data).subscribe((res:product)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Updated Successfully',
        showConfirmButton: false,
        timer: 1200
      })
      this.updateProductForm.reset();
      this.router.navigate(['seller-home']);
    })

  }

  productData(){
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.product.getProduct(productId).subscribe((res:any)=>{
      this.productItem = res;
    })
  }

}
